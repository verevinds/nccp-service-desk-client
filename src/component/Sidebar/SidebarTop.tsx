import React, { memo, useMemo, useContext, Fragment } from 'react';
import { useSelector } from 'react-redux';
import styles from './siderbar.module.scss';
import { IState, TUser } from '../../interface';
import { IncidentContext } from '../Incident/IncidentContext';

export interface ISidebarTop {
  item: any;
}

const SidebarTop: React.FC<ISidebarTop> = ({ item }) => {
  let { myIncident } = useContext(IncidentContext);
  const users = useSelector((state: IState) => state.users.list);

  const responsibleUserName = useMemo(() => {
    let user = users.find((elem: TUser) => elem.number === item.numberResponsible);

    if (user) return `${user.name1} ${user.name2.charAt(0)}. ${user.name2.charAt(0)}.`;
    return undefined;
  }, [users, item.numberResponsible]);

  const initiatorUserName = useMemo(() => {
    let user = users.find((elem: TUser) => elem.number === item.userNumber);

    if (user) return `${user.name1} ${user.name2.charAt(0)}. ${user.name2.charAt(0)}.`;
    return undefined;
  }, [users, item.userNumber]);

  return (
    <Fragment>
      {myIncident ? (
        <div></div>
      ) : (
        <div className={`${styles.bar__date} ${styles.bar__date_left}`}>
          {!!initiatorUserName ? `инициатор: ${initiatorUserName}` : <div></div>}
        </div>
      )}
      {myIncident ? (
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
