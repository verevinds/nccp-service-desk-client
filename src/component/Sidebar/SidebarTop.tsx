import React, { memo, useMemo, useContext, Fragment } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import styles from './siderbar.module.scss';
import { IState, TUser } from '../../interface';
import { IncidentContext } from '../Incident/IncidentContext';

export interface ISidebarTop {
  item: any;
}

const SidebarTop: React.FC<ISidebarTop> = ({ item }) => {
  let { myIncident } = useContext(IncidentContext);
  const { isFinishTime } = useSelector((state: IState) => state.setting);
  const users = useSelector((state: IState) => state.users.list);
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

  const responsibleUserName = useMemo(() => {
    let user = users.find((elem: TUser) => elem.number === item.numberResponsible);

    if (user) return `${user.name1} ${user.name2.charAt(0)}. ${user.name2.charAt(0)}.`;
    return undefined;
  }, [users]);

  const initiatorUserName = useMemo(() => {
    let user = users.find((elem: TUser) => elem.number === item.userNumber);

    if (user) return `${user.name1} ${user.name2.charAt(0)}. ${user.name2.charAt(0)}.`;
    return undefined;
  }, [users]);
  if (!doneWork || !isFinishTime)
    return (
      <Fragment>
        {!!isFinishTime || myIncident ? (
          <div></div>
        ) : (
          <div className={`${styles.bar__date} ${styles.bar__date_left}`}>
            {' '}
            {!!initiatorUserName ? `инициатор: ${initiatorUserName}` : <div></div>}
          </div>
        )}
        {!!isFinishTime || myIncident ? (
          <div></div>
        ) : (
          <div className={`${styles.bar__date} ${styles.bar__date_left}`}>
            {' '}
            <span className={styles.sidebar__date_green}>
              {!!responsibleUserName ? `ответственный: ${responsibleUserName}` : <div></div>}
            </span>
          </div>
        )}
      </Fragment>
    );
  else return <></>;
};

export default memo(SidebarTop);
