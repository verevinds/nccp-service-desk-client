import React, { memo, useMemo } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Moment from 'react-moment';
import styles from './siderbar.module.scss';

export interface ISidebarDown {
  item: any;
}

const SidebarDown: React.FC<ISidebarDown> = ({ item }) => {
  const createData = new Date(item.createdAt);
  const finishData = new Date(item.finishWork);
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
  }, [nowData, finishData, createData]);

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
