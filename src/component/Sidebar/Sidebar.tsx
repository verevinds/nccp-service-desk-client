import React, { memo, useState, useEffect } from 'react';
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './siderbar.module.scss';
//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTag, faUserClock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import SidebarDown from './SidebarDown';

const Sidebar: React.FC<ISidebar> = ({ list, onClick, activeId, filter }) => {
  const tags = (item: any, color?: any, tooltip?: string) => {
    let tags = [];
    if (!!item.status || Number(item.status) === 0) {
      tags.push(
        <OverlayTrigger
          key={item.id + 't'}
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">{tooltip}</Tooltip>}
        >
          <FontAwesomeIcon icon={faTag} color={color} className={'mb-1'} />
        </OverlayTrigger>,
      );
      if (!!item.responsible && Number(item.status) === 0) {
        tags.push(
          <OverlayTrigger
            key={item.id + 'c'}
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Ответсвенный назначен. Ожидание согласования.</Tooltip>}
          >
            <FontAwesomeIcon icon={faUserClock} color={'#007bff'} />
          </OverlayTrigger>,
        );
      } else if (item.consent) {
        tags.push(
          <OverlayTrigger
            key={item.id + 'd'}
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Ответсвенный назначен. Согласован.</Tooltip>}
          >
            <FontAwesomeIcon icon={faUserCheck} color={'#c3e6cb'} />
          </OverlayTrigger>,
        );
      }
    }

    return tags;
  };

  const [jsxListItem, setJsxListItem] = useState<JSX.Element[] | JSX.Element | void[]>([
    <p key={0}>Загрузка данных</p>,
  ]);

  useEffect(() => {
    if (Array.isArray(list) && list.length) {
      let sortList = list;
      const jsxItem: JSX.Element[] | void[] = sortList
        .sort((a: any, b: any) => (a[filter?.name] > b[filter?.name] ? 1 * filter?.sing : -1 * filter?.sing))
        .map((item: any) => {
          let itemText: string = '';

          if (item.createdAt) {
            itemText = ` №${item.id} `;
          }
          let color;
          let tooltip;
          if (item.status >= 0) {
            switch (Number(item.status)) {
              case 0:
                color = '#007bff';
                tooltip = `Новая заявка. Нет ответственного.`;
                break;
              case 8388607:
                color = '#c3e6cb';
                tooltip = `Готово. Ждёт закрытия.`;
                break;
              case 8388608:
                color = '#c3e6cb';
                tooltip = `Закрыт`;
                break;
              case 8388604:
                color = '#dc3545';
                tooltip = `Отказано. Причина в комментариях`;
                break;
              default:
                color = '#bee5eb';
                tooltip = `В работе`;
                break;
            }
          }

          return (
            <ListGroup.Item
              key={item.id}
              //@ts-ignore
              onClick={onClick ? () => onClick(item.id) : null}
              className={`${styles.item} ${activeId === item.id ? styles.active : null}`}
            >
              <div className={styles.bar}>
                <div className={styles.bar__container_top}>
                  <div className={`${styles.icon} ${styles.icon_left}`}>
                    {tags(item, color, tooltip)?.map((item) => item)}
                  </div>
                  <div className={styles.item__body}>
                    <div className={styles.item__id}>
                      <span>{itemText}</span>
                    </div>
                    <div className={styles.item__text}>
                      <span className={styles.item__text_span}>
                        {!!item.name.trim() ? item.name : 'Без категории'} {item.responsible}
                      </span>
                    </div>
                  </div>
                </div>
                <SidebarDown item={item} />
                <div className={styles.bar__container_sideRight}>
                  <div className={`${styles.icon} ${styles.icon_right}`}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          );
        });

      setJsxListItem(jsxItem);
    }
  }, [list, activeId, onClick, filter]);

  return <ListGroup variant="flush">{jsxListItem}</ListGroup>;
};

export default memo(Sidebar);
