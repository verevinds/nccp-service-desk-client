import React, { memo, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IState, TIncident, TRulesList } from '../../interface';
export interface IIncidentWindowVisa {}

const IncidentWindowVisa: React.FC<IIncidentWindowVisa> = (props) => {
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  return (
    <Fragment>
      <h6>
        <small>Список согласующих:</small>
      </h6>
      {incident.rules_lists.map((item: TRulesList, index: number) => (
        <div className="flex  blockquote-footer" key={index}>
          <div>
            {item.position.users.map((item: any, index: number) => (
              <p key={index}>{`${item.name1} ${item.name2} ${item.name3}:  `}</p>
            ))}
          </div>
          <div style={{ color: item.hasVisa ? 'green' : 'red' }} className="ml-2">
            {item.hasVisa ? 'Согласовано' : 'Не согласовано'}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default memo(IncidentWindowVisa);
