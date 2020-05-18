import React, { memo, useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';
import styles from './siderbar.module.css';
//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC<ISidebar> = ({ list, onClick, activeId }) => {
  const [jsxListItem, setJsxListItem] = useState<
    JSX.Element[] | JSX.Element | void[]
  >([<p key={0}>Загрузка данных</p>]);
  useEffect(() => {
    if (Array.isArray(list) && list.length) {
      const jsxItem: JSX.Element[] | void[] = list.map((item: any) => {
        let itemText: string;
        if (item.createdAt) {
          itemText = `№${item.id} - ${item.name ? item.name : 'N/A'} ${
            item.responsible
          }  `;
        } else {
          itemText = `${item.name ? item.name : 'N/A'} `;
        }
        let color = '#1b1e21';
        if (item.status) {
          if (Number(item.status) === 8388608) {
            color = '#c3e6cb';
          } else {
            color = '#bee5eb';
          }
        } else {
          color = '#007bff';
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
            <span>
              {itemText}
              {item.createdAt ? (
                <Moment locale="ru" format="DD MMM YY">
                  {item.createdAt}
                </Moment>
              ) : null}
            </span>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faAngleRight} color={color} />
            </div>
          </ListGroup.Item>
        );
      });

      setJsxListItem(jsxItem);
    }
  }, [list, activeId, onClick]);

  return <ListGroup variant="flush">{jsxListItem}</ListGroup>;
};

export default memo(Sidebar);
