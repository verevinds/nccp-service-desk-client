import React, { memo, useState, useEffect, useMemo } from 'react';
import { ListGroup, OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';
import Moment from 'react-moment';
import styles from './siderbar.module.scss';
//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTag, faUserClock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { TList } from '../List/List';

export interface ISidebarDown {
  item: any;
}

const SidebarDown: React.FC<ISidebarDown> = ({ item }) => {
  const createData = new Date(item.createdAt);
  const finishData = new Date(item.finishWork);
  const doneWork = new Date(item.doneWork);
  const nowData = new Date();
  // console.log(item);
  // console.log(new Date(Number(nowData) - Number(createData)).getDate());

  const color = useMemo(() => {
    if (nowData > finishData) {
      return 'danger';
    } else {
      if (new Date(Number(nowData) - Number(createData)).getDate() > 1) return 'warning';
      else return 'info';
    }
  }, [nowData, finishData]);

  if (!item.doneWork)
    return (
      <div className={styles.bar__container_down}>
        <div className={`${styles.bar__date} ${styles.bar__date_left}`}>
          {item.finishWork ? (
            <Moment locale="ru" format="DD.MM.YY">
              {item.finishWork}
            </Moment>
          ) : null}
        </div>
        <div className={`${styles.bar__date} ${styles.bar__date_right}`}>
          {item.createdAt ? (
            <Moment locale="ru" format="DD.MM.YY">
              {item.createdAt}
            </Moment>
          ) : null}
        </div>
        <ProgressBar
          striped
          animated
          variant={color}
          now={+nowData}
          max={+finishData}
          min={+createData}
          className={styles.bar__progress}
        />
      </div>
    );
  else return <></>;
};

export default memo(SidebarDown);
