import React, { memo, useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';
import styles from './siderbar.module.css';
//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faTag,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC<ISidebar> = ({ list, onClick, activeId }) => {
  const tags = (item: any, color?: any) => {
    let tags = [];
    console.log('item', item);
    if (!!item.status || Number(item.status) === 0) {
      tags.push(
        <FontAwesomeIcon
          key={item.id + 't'}
          icon={faTag}
          color={color}
          className={'mb-1'}
        />,
      );
      if (!!item.responsible && Number(item.status) === 0) {
        tags.push(
          <FontAwesomeIcon
            key={item.id + 'c'}
            icon={faUserClock}
            color={'#007bff'}
          />,
        );
      }
    }

    return tags;
  };

  const [jsxListItem, setJsxListItem] = useState<
    JSX.Element[] | JSX.Element | void[]
  >([<p key={0}>Загрузка данных</p>]);
  useEffect(() => {
    if (Array.isArray(list) && list.length) {
      const jsxItem: JSX.Element[] | void[] = list.map((item: any) => {
        let itemText: string = '';
        if (item.createdAt) {
          itemText = ` №${item.id} `;
        }
        let color;
        if (item.status) {
          if (Number(item.status) === 8388608) {
            color = '#c3e6cb';
          } else {
            color = '#bee5eb';
          }
        } else if (item.status === 0) {
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
            <div className={`${styles.icon} ${styles.icon_left}`}>
              {tags(item, color)?.map((item) => item)}
            </div>
            <div className={styles.item__body}>
              <div className={styles.item__id}>
                <span>{itemText}</span>
              </div>
              <div className={styles.item__text}>
                <span className={styles.item__text_span}>
                  {item.name ? item.name : 'N/A'} {item.responsible}
                </span>
              </div>
              <div className={styles.item__date}>
                {item.createdAt ? (
                  <Moment locale="ru" format="DD.MM.YY">
                    {item.createdAt}
                  </Moment>
                ) : null}
              </div>
            </div>
            <div className={`${styles.icon} ${styles.icon_right}`}>
              <FontAwesomeIcon icon={faAngleRight} />
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
