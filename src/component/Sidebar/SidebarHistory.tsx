import React, { memo, useState, useEffect } from 'react';
import { ISidebarHistory } from './interface';
import { Accordion, Card, Button } from 'react-bootstrap';
import styles from './sidebarHistory.module.css';
import Sidebar from './Sidebar';
import { useSelector, shallowEqual } from 'react-redux';

const SidebarHistory: React.FC<ISidebarHistory> = ({
  onClick,
  activeId,
  onClickHistory,
}) => {
  const history = useSelector(
    (state: any) => state.incidents.history,
    shallowEqual,
  );
  const [isLoadHistory, setIsLoadHistory] = useState(false);
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
          responsible = `(${
            item.responsibleUser.name1
          } ${item.responsibleUser.name2.charAt(
            0,
          )}. ${item.responsibleUser.name3.charAt(0)}.)`;
        } else {
          responsible = '';
        }
        const newItem = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${
            item.property ? item.property.name : ''
          } ${item.option ? item.option.name : ''}`,
          createdAt: item.createdAt,
          responsible,
          status: item.statusId,
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
                <Sidebar
                  list={sidebarList.sort((a: any, b: any) =>
                    Number(a?.id) < Number(b?.id) ? 1 : -1,
                  )}
                  onClick={onClick}
                  activeId={activeId}
                />
              ) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};
export default memo(SidebarHistory);
