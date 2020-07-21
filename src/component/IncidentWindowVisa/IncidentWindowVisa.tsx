import React, { memo, Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IState, TIncident, TRulesList, TRulesListPositionUser, TUser } from '../../interface';
import { nameUser } from '../../js/supportingFunction';
export interface IIncidentWindowVisa {}
interface newRulesList {
  name?: string;
  uniqueNumber?: number | null;
  hasVisa?: boolean;
}

const IncidentWindowVisa: React.FC<IIncidentWindowVisa> = (props) => {
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const users: TUser[] = useSelector((state: IState) => state.users.list);
  const rulesLists = useMemo(() => {
    const uniqueRules: any[] = [];

    incident.rules_lists.forEach((ruleList: TRulesList) => {
      let isUser = false;

      let rule: newRulesList = {};

      /** Выбираем уникальные ответственности по ресурсам */
      if (!!ruleList.userNumber) {
        uniqueRules.forEach((item: any) => {
          if (ruleList.userNumber === item.uniqueNumber) isUser = true;
        });

        const name = nameUser(users, ruleList.userNumber)?.fullName();
        rule = { name: name, uniqueNumber: ruleList.userNumber, hasVisa: ruleList.hasVisa };
        if (!isUser) uniqueRules.push(rule);
      }

      /** Выбираем уникальные ответственности по должности */
      if (!!ruleList.position) {
        ruleList.position?.users.forEach((user: TRulesListPositionUser) => {
          isUser = false;
          if (uniqueRules.length === 0) {
            rule = {
              name: `${user.name1} ${user.name2} ${user.name3} `,
              uniqueNumber: user.number,
              hasVisa: ruleList.hasVisa,
            };
          } else
            uniqueRules.forEach((item: any) => {
              if (item.uniqueNumber === user.number) {
                isUser = true;
              } else {
                rule = {
                  name: `${user.name1} ${user.name2} ${user.name3} `,
                  uniqueNumber: user.number,
                  hasVisa: ruleList.hasVisa,
                };
              }
            });

          if (!isUser) uniqueRules.push(rule);
        });
      }
    });

    return uniqueRules;
  }, [incident.rules_lists, users]);

  return (
    <Fragment>
      <h6>
        <small>Список согласующих:</small>
      </h6>
      {rulesLists.map((item: newRulesList, index: number) => (
        <div className="flex  blockquote-footer" key={index}>
          <div>
            <p key={index}>{`${item.name}:  `}</p>
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
