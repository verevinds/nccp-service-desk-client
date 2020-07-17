import React, { memo, useMemo, useContext, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styles from './siderbar.module.scss';
import { IState, TIncident } from '../../interface';
import { IncidentContext } from '../Incident/IncidentContext';
import { nameUser } from '../../js/supportingFunction';

export interface ISidebarTop {
  item: TIncident;
}

const SidebarTop: React.FC<ISidebarTop> = ({ item: { currentResponsible, userNumber } }) => {
  let { isMyIncidentsPage } = useContext(IncidentContext);
  const users = useSelector((state: IState) => state.users.list);

  const responsibleUserName = useMemo(() => nameUser(users, currentResponsible)?.initials(), [
    users,
    currentResponsible,
  ]);

  const initiatorUserName = useMemo(() => nameUser(users, userNumber)?.initials(), [users, userNumber]);

  return (
    <Fragment>
      {isMyIncidentsPage ? (
        <div></div>
      ) : (
        <div className={`${styles.bar__date} ${styles.bar__date_left}`}>
          {!!initiatorUserName ? `инициатор: ${initiatorUserName}` : <div></div>}
        </div>
      )}
      {isMyIncidentsPage ? (
        <div></div>
      ) : (
        <div className={`${styles.bar__date} ${styles.bar__date_left} `}>
          <span>{!!responsibleUserName ? `ответственный: ${responsibleUserName}` : <div></div>}</span>
        </div>
      )}
    </Fragment>
  );
};

export default memo(SidebarTop);
