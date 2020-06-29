import React, { memo, useMemo, useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { IState, TIncidentCurrent, TMatch, TUser } from '../../interface';

import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';

export interface IHandleMatches {}

const HandleMatches: React.FC<IHandleMatches> = () => {
  const {
    incident: { matches, currentResponsible },
  }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current, shallowEqual);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { onClick } = useContext(IncidentWindowContext);

  let jsxButton = useMemo(() => {
    // eslint-disable-next-line
    let button =
      matches &&
      matches.map((item: TMatch) => {
        if (user.position.level)
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
    if (!!button[0]) return button;
  }, [matches, onClick]);

  const jsxVise = useMemo(() => {
    // eslint-disable-next-line
    let button =
      matches &&
      matches.map((item: TMatch) => {
        if (!item.isMatch)
          if (item.code === 3 && currentResponsible === user.number) {
            return {
              okText: 'Завизировать заявку',
              okVariant: 'success',
              okOnClick: onClick.bind({
                matchHandle: { method: 'delete', params: { incidentId: item.incidentId } },
                incidentData: { statusId: 1, ...item.params },
                comment: `Заявка завизирована`,
              }),

              canselText: 'Отказать',
              canselVariant: 'outline-danger',
              canselOnClick: onClick.bind({
                matchHandle: { method: 'delete', id: item.id },
                incidentData: {},
                comment: `Отказано в переводе`,
              }),
            };
          }
      });
    if (!!button[0]) return button;
  }, [matches, onClick]);

  return (
    <>
      {!!jsxVise
        ? jsxVise.map((item: any, index: number) => (
            <ButtonGroup aria-label="Basic example" key={'vise-1'}>
              <Button variant={item.okVariant} onClick={item.okOnClick}>
                {item.okText}
              </Button>
              <Button variant={item.canselVariant} onClick={item.canselOnClick}>
                {item.canselText}
              </Button>
            </ButtonGroup>
          ))
        : undefined}
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
