import React, { memo, useState, useEffect, Fragment } from 'react';
import { ISidebarHistory } from './interface';
import { Accordion, Card, Button } from 'react-bootstrap';
import styles from './sidebarHistory.module.css';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import SidebarFilter from '../SidebarFilter/SidebarFilter';
import { IState } from '../../interface';

const SidebarHistory: React.FC<ISidebarHistory> = ({ onClick, activeId, onClickHistory }) => {
  const history = useSelector((state: IState) => state.incidents.history);
  const [isLoadHistory, setIsLoadHistory] = useState(false);
  const [filter, setFilter] = useState<any>(undefined);
  useEffect(() => {
    if (isLoadHistory) {
      onClickHistory();
    }
  }, [isLoadHistory, onClickHistory]);

  return (
    <>
      <Accordion defaultActiveKey="1" className={styles.accordion}>
        <Card className={styles.item}>
          <Accordion.Toggle
            as={Button}
            eventKey="0"
            variant={'light'}
            onClick={() => {
              setIsLoadHistory(true);
            }}
          >
            Показать историю
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.body}>
              {history ? (
                <Fragment>
                  <div className={styles.title}>
                    <h6>Отработанные заявки</h6>
                    <SidebarFilter setFilter={setFilter} color={'#c3c3c3'} />
                  </div>
                  <Sidebar list={history} filter={filter} onClick={onClick} activeId={activeId} />
                </Fragment>
              ) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};
export default memo(SidebarHistory);
