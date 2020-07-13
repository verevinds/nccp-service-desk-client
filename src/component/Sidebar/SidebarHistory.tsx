import React, { memo, useState, useEffect, Fragment } from 'react';
import { ISidebarHistory } from './interface';
import { Accordion, Card, Button } from 'react-bootstrap';
import styles from './sidebarHistory.module.css';
import Sidebar from './Sidebar';
import { useSelector, shallowEqual } from 'react-redux';
import SidebarFilter from '../SidebarFilter/SidebarFilter';

const SidebarHistory: React.FC<ISidebarHistory> = ({ onClick, activeId, onClickHistory }) => {
  const history = useSelector((state: any) => state.incidents.history, shallowEqual);
  const [isLoadHistory, setIsLoadHistory] = useState(false);
  const [filter, setFilter] = useState<any>(undefined);
  useEffect(() => {
    if (isLoadHistory) {
      onClickHistory();
    }
  }, [isLoadHistory, onClickHistory]);

  const [sidebarList, setSidebarList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line
    setSidebarList(
      history.map((item: any) => {
        let responsible;
        if (item.responsibleUser) {
          responsible = `(${item.responsibleUser.name1} ${item.responsibleUser.name2.charAt(
            0,
          )}. ${item.responsibleUser.name3.charAt(0)}.)`;
        } else {
          responsible = '';
        }
        const newItem = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${item.property ? item.property.name : ''} ${
            item.option ? item.option.name : ''
          }`,
          createdAt: item.createdAt,
          responsible,
          status: item.statusId,
          finishWork: item.finishWork,
          doneWork: item.doneWork,
          userNumber: item.userNumber,
        };
        return newItem;
      }),
    );
    // eslint-disable-next-line
  }, [history]);
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
              {Array.isArray(sidebarList) && sidebarList.length ? (
                <Fragment>
                  <div className={styles.title}>
                    <h6>Отработанные заявки</h6>
                    <SidebarFilter setFilter={setFilter} color={'#c3c3c3'} />
                  </div>
                  <Sidebar list={sidebarList} filter={filter} onClick={onClick} activeId={activeId} />
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
