import React, { memo, useMemo, useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { IState, TIncidentCurrent, TMatch } from '../../interface';

import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';

export interface IHandleMatches {}

const HandleMatches: React.FC<IHandleMatches> = () => {
  const {
    incident: { matches },
  }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current, shallowEqual);
  console.log(matches);
  const { onClick } = useContext(IncidentWindowContext);

  let jsxButton = useMemo(() => {
    if (matches)
      // eslint-disable-next-line
      return matches.map((item: TMatch) => {
        if (!item.isMatch)
          switch (item.code) {
            case 1:
              return {
                okVariant: 'success',
                okOnClick: onClick.bind({
                  matchHandle: { method: 'put', data: { isMatch: true }, id: item.id },
                  incidentData: { startWork: new Date(), statusId: 1 },
                  comment: `Ответственный согласован`,
                }),
                okText: 'Согласовать ответственного',
                canselVariant: 'outline-danger',
                canselOnClick: onClick.bind({
                  matchHandle: { method: 'delete', id: item.id },
                  incidentData: { startWork: null, statusId: 0, currentResponsible: null },
                  comment: `Отказано в назначение ответственного`,
                }),
                canselText: 'Отказать',
              };
            case 2:
              return {
                okText: 'Согласовать перевод',
                okVariant: 'success',
                okOnClick: onClick.bind({
                  matchHandle: { method: 'delete', params: { incidentId: item.incidentId } },
                  incidentData: { startWork: null, statusId: 0, currentResponsible: null, ...item.params },
                  comment: `Перевод согласован`,
                }),

                canselText: 'Отказать',
                canselVariant: 'outline-danger',
                canselOnClick: onClick.bind({
                  matchHandle: { method: 'delete', id: item.id },
                  incidentData: {},
                  comment: `Отказано в переводе`,
                }),
              };
            default:
              break;
          }
      });
  }, [matches, onClick]);
  return (
    <>
      {jsxButton?.length &&
        jsxButton.map((item: any, index: number) => {
          return (
            <ButtonGroup aria-label="Basic example" key={index}>
              <Button variant={item.okVariant} onClick={item.okOnClick}>
                {item.okText}
              </Button>
              <Button variant={item.canselVariant} onClick={item.canselOnClick}>
                {item.canselText}
              </Button>
            </ButtonGroup>
          );
        })}
    </>
  );
};

export default memo(HandleMatches);
