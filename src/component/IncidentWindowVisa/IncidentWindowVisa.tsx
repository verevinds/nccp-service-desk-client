import React, { memo, Fragment } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { IState, TIncident, TRulesList } from '../../interface';
export interface IIncidentWindowVisa {}

const IncidentWindowVisa: React.FC<IIncidentWindowVisa> = (props) => {
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  console.log(incident);
  return (
    <Fragment>
      {incident.rules_lists.map((item: TRulesList, index: number) => (
        <div className="flex flex_between" key={index}>
          <div>
            {item.position.users.map((item: any, index: number) => (
              <p key={index}>
                {item.name1} {item.name2} {item.name3}
              </p>
            ))}
          </div>
          <div style={{ color: item.hasVisa ? 'green' : 'red' }}>{item.hasVisa ? 'Согласовано' : 'Не согласовано'}</div>
        </div>
      ))}
    </Fragment>
  );
};

export default memo(IncidentWindowVisa);
