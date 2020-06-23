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
  const startWork = !!item.startWork ? new Date(item.startWork) : undefined;
  const doneWork = !!item.doneWork ? new Date(item.doneWork) : undefined;
  const nowData = new Date();
  // console.log(item);
  // console.log(new Date(Number(nowData) - Number(createData)).getDate());

  const create = Number(createData) / (60 * 60 * 24 * 1000);
  const finish = Number(finishData) / (60 * 60 * 24 * 1000);
  const deadline = finish - create;
  const start = ((Number(startWork) / (60 * 60 * 24 * 1000) - create) / deadline) * 100;
  const now = ((Number(nowData) / (60 * 60 * 24 * 1000) - create) / deadline) * 100;
  const done = ((Number(doneWork) / (60 * 60 * 24 * 1000) - create) / deadline) * 100;

  const colorStart = useMemo(() => {
    if (start) return 'info';
    if (now > 100) {
      return 'danger';
    } else {
      if (now > 40) {
        if (start) return undefined;
        else return 'warning';
      } else {
      }
    }
  }, [start, now]);

  const colorEnd = useMemo(() => {
    if (!!doneWork) return 'success';
    if (now - start > 100) {
      return 'danger';
    } else {
      if (now > 80) {
        return 'warning';
      } else return 'success';
    }
  }, [start, doneWork, now]);

  if (!doneWork)
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
        <ProgressBar className={styles.bar__progress}>
          <ProgressBar striped animated variant={colorStart} now={!!start ? start : now} key={1} />
          {!!start ? (
            <ProgressBar striped animated variant={colorEnd} now={!!done ? done - start : now - start} key={2} />
          ) : undefined}
        </ProgressBar>
      </div>
    );
  else return <></>;
};

export default memo(SidebarDown);
