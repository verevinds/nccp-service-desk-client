import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Moment from 'react-moment';
import styles from './styles.module.css';
import 'moment/locale/ru';
import IncidentModalWrapper from '../IncidentHandleStatus/IncidentHandleStatus';

//ActionCreator
import {
  incidentFetching,
  incidentCreate,
} from '../../redux/actionCreators/incidentAction';
import { queryApi } from '../../redux/actionCreators/queryApiAction';

import IncidentInWork from '../IncidentInWork/IncidentInWork';
import IncidentStatus from '../IncidentStatus/IncidentStatus';
import IncidentWorkButton from '../IncidentWorkButton/IncidentWorkButton';

import { Container, Card, Accordion, Table } from 'react-bootstrap';

const IncidentWindow = ({ incident, myincident }) => {
  //State изменений в инциденте
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [fullName, setFullName] = useState(``);
  useEffect(() => {
    if (user) {
      setFullName(`${user.name1} ${user.name2} ${user.name3}`);
    }
  }, [user]);
  const onClick = (number = null, comment = null, dataCatalog) => {
    const date = new Date();
    const dateNow = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const responsible = {
      currentResponsible: number,
      startWork: dateNow,
      statusId: Number(1),
    };
    if (!!dataCatalog) {
      Object.assign(responsible, dataCatalog);
    }

    dispatch(incidentFetching('put', responsible, incident.id, 'incidents'));

    const data = {
      text: comment,
      userNumber: user.number,
      incidentId: incident.id,
    };
    dispatch(
      queryApi({
        route: 'comments',
        method: 'post',
        actionUpdate: incidentCreate,
        data,
        id: incident.id,
      }),
    );
  };
  useEffect(() => {}, [incident]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  if (!!incident) {
    return (
      <>
        {showModal ? (
          <IncidentModalWrapper
            show={showModal}
            onHide={handleCloseModal}
            incident={incident}
          />
        ) : null}
        <Container>
          <Card>
            <Card.Header className={styles.header}>
              <div>
                Инцидент №{incident.id}{' '}
                {incident.responsibleUser ? (
                  <>
                    {'| '}
                    <IncidentInWork
                      startWork={incident.startWork}
                      nameResponsible={`
                ${
                  incident.responsibleUser.name1
                } ${incident.responsibleUser.name2.charAt(
                        0,
                      )}.${incident.responsibleUser.name3.charAt(0)}.`}
                    />
                  </>
                ) : null}
              </div>
              <IncidentStatus
                myincident={myincident | undefined}
                status={incident.statusId}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {!!incident.category ? incident.category.name : null}

                {!!incident.property ? ` / ${incident.property.name}` : null}

                {!!incident.option ? ` /  ${incident.option.name}` : null}
              </Card.Title>
              <Card.Text></Card.Text>
              <Card.Text>
                Инициатор:{' '}
                {`${incident.initiatorUser.name1 || ''} ${
                  incident.initiatorUser.name2 || ''
                } ${incident.initiatorUser.name3 || ''}`}
              </Card.Text>
              <Card.Text>
                {!!incident.initiatorUser
                  ? `Email: ${incident.initiatorUser.email} `
                  : null}
              </Card.Text>
              <Card.Text>
                {!!incident.initiatorUser
                  ? `Тел.: ${incident.initiatorUser.phone1} `
                  : null}
              </Card.Text>
              {incident.text ? <hr /> : null}
              <Card.Text>{incident.text}</Card.Text>
              {!myincident ? (
                <IncidentWorkButton
                  incident={incident}
                  handleOpenModal={handleOpenModal}
                  onClick={onClick}
                  user={user}
                />
              ) : null}
              <br />
              <br />
              {incident.comments.length ? (
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Комментарии
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Table striped bordered size="sm">
                        <thead>
                          <tr>
                            <th>№</th>
                            <th>Текст</th>
                            <th>Автор</th>
                            <th>Дата</th>
                          </tr>
                        </thead>
                        <tbody>
                          {incident.comments.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.text}</td>
                              <td>{`${item.user.name1} ${item.user.name2.charAt(
                                0,
                              )}. ${item.user.name3.charAt(0)}.`}</td>
                              <td>
                                <Moment
                                  locale="ru"
                                  format="D.MM.YYг HH:mm"
                                  withTitle
                                >
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
              ) : null}
            </Card.Body>
            <Card.Footer className="text-right">
              <small>
                <i>
                  <b>Создан:</b>{' '}
                  <Moment locale="ru" fromNow>
                    {incident.createdAt}
                  </Moment>
                </i>
                {' | '}
                <i>
                  <b>Последнее обновление:</b>{' '}
                  <Moment locale="ru" fromNow>
                    {incident.updatedAt}
                  </Moment>
                </i>
              </small>
            </Card.Footer>
          </Card>
        </Container>
      </>
    );
  } else {
    return <h2>Выберите инцидент</h2>;
  }
};

export default memo(IncidentWindow);
