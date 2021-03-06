import React, { memo, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';
import Moment from 'react-moment';
import 'moment/locale/ru';

//Bootstrap
import { Card, Accordion, Table } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { nameUser } from '../../js/supportingFunction';

const IncidentWindowComments = () => {
  const [accordion, setAccordion] = useState(false);
  const comments = useSelector((state) => state.incidents?.current.incident.comments, shallowEqual);
  return (
    <>
      <Accordion defaultActiveKey={'1'} className={styles.accordion}>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            onClick={() => {
              let boolean = accordion;
              setAccordion(!boolean);
            }}
            className={styles.comment__header}
          >
            <FontAwesomeIcon icon={accordion ? faAngleDown : faAngleRight} /> Комментарии
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Table striped bordered size="sm" className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th className={styles.textColumn}>Текст</th>
                  <th>Автор комментария</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {comments
                  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                  .map((item, index, comments) => (
                    <tr key={item.id}>
                      <td>{comments.length - index}</td>
                      <td>
                        <pre>{item.text}</pre>
                      </td>
                      <td>{nameUser(item.user).initials()}</td>
                      <td>
                        <Moment locale="ru" format="HH:mm D.MM.YYг" withTitle>
                          {item.createdAt}
                        </Moment>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

export default memo(IncidentWindowComments);
