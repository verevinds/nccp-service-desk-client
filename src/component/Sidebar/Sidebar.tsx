import React, { memo, useState, useEffect, useContext } from 'react';
import { ListGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './siderbar.module.scss';
//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTag, faUserClock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import SidebarDown from './SidebarDown';
import { IncidentContext } from '../Incident/IncidentContext';
import SidebarTop from './SidebarTop';
import { TIncident } from '../../interface';

const Sidebar: React.FC<ISidebar> = ({ list, onClick, activeId, filter }) => {
  const { match } = useContext(IncidentContext);
  const [limit, setLimit] = useState(8);

  const tags = (item: TIncident, color?: string, tooltip?: string) => {
    let tags = [];
    if (item.statusId >= 0) {
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

      if (!!item.currentResponsible && Number(item.statusId) === 0) {
        tags.push(
          <OverlayTrigger
            key={item.id + 'c'}
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Ответсвенный назначен. Ожидание согласования.</Tooltip>}
          >
            <FontAwesomeIcon icon={faUserClock} color={'#597ba5'} />
          </OverlayTrigger>,
        );
      }
      if (item.consent) {
        tags.push(
          <OverlayTrigger
            key={item.id + 'd'}
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Ответственный согласован</Tooltip>}
          >
            <FontAwesomeIcon icon={faUserCheck} color={'#8cce9b'} />
          </OverlayTrigger>,
        );
      }
    }
    return tags;
  };

  const [jsxListItem, setJsxListItem] = useState<(JSX.Element | undefined)[]>([<p key={0}>Загрузка данных</p>]);

  useEffect(() => {
    if (Array.isArray(list) && list.length) {
      let sortList = list;
      const jsxItem: (JSX.Element | undefined)[] = sortList
        .sort((a: TIncident, b: TIncident) =>
          a[filter?.name] > b[filter?.name] ? 1 * filter?.sing : -1 * filter?.sing,
        )
        .map((item: TIncident, index: number) => {
          if (index < limit) {
            let itemText: string = '';

            if (item.createdAt) {
              itemText = ` №${item.id} `;
            }
            let color;
            let tooltip;
            if (item.statusId >= 0) {
              switch (Number(item.statusId)) {
                case 0:
                  color = '#597ba5';
                  tooltip = `Новая заявка. Нет ответственного.`;
                  break;
                case 8388607:
                  // color = '#c3e6cb';
                  color = '#8cce9b';
                  tooltip = `Готово. Ждёт закрытия.`;
                  break;
                case 8388608:
                  color = '#9ca2a7';
                  tooltip = `Закрыт`;
                  break;
                case 8388604:
                  color = '#e57983';
                  tooltip = `Отказано. Причина в комментариях`;
                  break;
                case 8388606:
                  color = '#ffe083';
                  tooltip = `На согласовании`;
                  break;
                case 8388605:
                  color = '#007bff';
                  tooltip = `Отправлено на доработку. Нужно исправить и вернуть в работу.`;
                  break;
                default:
                  color = '#bee5eb';
                  tooltip = `В работе`;
                  break;
              }
            }
            // {match ? {to:{`${match.path}/${item.id}` }}: undefined}
            const to = !!match ? { to: `${match.path}/${item.id}` } : undefined;

            const isActive = activeId === item.id ? true : false;

            const itemName = `${item.category ? item.category.name : ''} ${item.property ? item.property.name : ''} ${
              item.option ? item.option.name : ''
            }`;

            return (
              <ListGroup.Item
                key={item.id}
                as={match ? NavLink : undefined}
                {...to}
                //@ts-ignore
                onClick={onClick ? () => onClick(item.id) : null}
                className={`${styles.item} ${isActive ? styles.active : null} bg font-light`}
              >
                <div className={styles.sidebar}>
                  <div className={styles.sidebar__container_top}>
                    <SidebarTop item={item} />
                  </div>

                  <div className={`${styles.sidebar__container_centerLeft} ${styles.icon} ${styles.icon_left}`}>
                    {tags(item, color, tooltip)?.map((item) => item)}
                  </div>

                  <div className={styles.sidebar__container_center}>
                    <div className={styles.item__id}>
                      <span>{itemText}</span>
                    </div>
                    <div className={styles.item__text}>
                      <span className={styles.item__text_span}>{itemName ? itemName : 'Без категории'}</span>
                    </div>
                  </div>
                  {!isActive ? undefined : (
                    <div className={styles.sidebar__container_centerRight}>
                      <div className={`${styles.icon} ${styles.icon_right}`}>
                        <FontAwesomeIcon icon={faAngleRight} />
                      </div>
                    </div>
                  )}

                  <div className={styles.sidebar__container_down}>
                    <SidebarDown item={item} />
                  </div>
                </div>
              </ListGroup.Item>
            );
          } else return undefined;
        });

      jsxItem && setJsxListItem(jsxItem);
    }
    // eslint-disable-next-line
  }, [list, activeId, onClick, filter, limit]);

  return (
    <ListGroup variant="flush">
      {jsxListItem}
      {list.length > 8 && list.length > limit ? (
        <Button
          variant={'light'}
          onClick={() => {
            setLimit(limit + 8);
          }}
          className={'mt-1'}
        >
          Показать ещё
        </Button>
      ) : undefined}
    </ListGroup>
  );
};

export default memo(Sidebar);
