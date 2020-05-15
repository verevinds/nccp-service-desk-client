import React, { memo, useState, useEffect } from 'react';
import { Container, Badge, ListGroup, Accordion, Card } from 'react-bootstrap';
import Moment from 'react-moment';
import styles from './siderbar.module.css';

//Interface TypeScript for function Sidebar
import { ISidebar, TList } from './interface';

const Sidebar: React.FC<ISidebar> = ({ list, onClick, activeId }) => {
  const [jsxListItem, setJsxListItem] = useState<
    JSX.Element[] | JSX.Element | void[]
  >([<p key={0}>Загрузка данных</p>]);
  useEffect(() => {
    if (Array.isArray(list) && list.length) {
      const jsxItem: JSX.Element[] | void[] = list.map((item: TList) => {
        let itemText: string;
        if (item.createdAt) {
          itemText = `№${item.id} - ${item.name ? item.name : 'N/A'} ${
            item.responsible
          } - `;
        } else {
          itemText = `${item.name ? item.name : 'N/A'} `;
        }
        return (
          <ListGroup.Item
            key={item.id}
            //@ts-ignore
            onClick={onClick ? () => onClick(item.id) : null}
            className={`${styles.item} ${
              activeId === item.id ? styles.active : null
            }`}
          >
            {itemText}
            {item.createdAt ? (
              <Moment locale="ru" format="DD.MM">
                {item.createdAt}
              </Moment>
            ) : null}
          </ListGroup.Item>
        );
      });

      setJsxListItem(jsxItem);
    }
  }, [list, activeId, onClick]);

  return <ListGroup variant="flush">{jsxListItem}</ListGroup>;
};

export default memo(Sidebar);
