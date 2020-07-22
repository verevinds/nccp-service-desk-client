import React, { memo, useMemo, useContext, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IState, TIncidentCurrent, TMatch, TUser, TIncident } from '../../interface';
import { AppContext } from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHandshakeSlash } from '@fortawesome/free-solid-svg-icons';
import { IApi } from '../../js/api';

const HandleMatches = () => {
  const {
    incident: { matches, currentResponsible },
  }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current);
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);

  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { apiDispatch } = useContext(AppContext);

  const onClick = useCallback(
    function (this: IApi, item: TMatch) {
      const comments = this.comments(user.number, incident.id);
      return {
        ok: () => {
          let match = () => this.matches().put(item.id, { data: { isMatch: true } });

          return {
            responsible: () => {
              comments.post({
                data: { text: `Ответственный согласован` },
              });
              this.incidents().put(incident.id, { data: { startWork: new Date(), statusId: 1, consent: true } });
              match();
            },
            transfer: () => {
              comments.post({
                data: { text: `Перевод согласован` },
              });
              this.incidents().put(incident.id, {
                data: { startWork: null, statusId: 0, currentResponsible: null, ...item.params },
              });
              match();
            },
            vise: () => {
              comments.post({
                data: { text: `Заявка завизирована` },
              });
              this.incidents().put(incident.id, { data: { statusId: 1, ...item.params } });
              match();
            },
          };
        },
        cansel: () => {
          let match = () => this.matches().delete(item.id);

          return {
            responsible: () => {
              comments.post({
                data: { text: `Отказано в назначение ответственного` },
              });
              this.incidents().put(incident.id, {
                data: { startWork: null, statusId: 0, currentResponsible: null, consent: false },
              });
              match();
            },
            transfer: () => {
              comments.post({
                data: { text: `Отказано в переводе` },
              });
              match();
            },
            vise: () => {
              comments.post({
                data: { text: `Заявка не согласована` },
              });
              match();
            },
          };
        },
      };
    },
    [user.number, incident],
  );

  function createButton(okText: string, okOnClick: () => void, cancelOnClick: () => void, isMatch: boolean) {
    let okVariant = 'success';
    let cancelVariant = 'outline-danger';
    let cancelText = 'Отказать';

    return {
      isMatch,
      okVariant,
      okText,
      okOnClick,
      cancelVariant,
      cancelText,
      cancelOnClick,
    };
  }

  let jsxButton = useMemo(() => {
    if (apiDispatch) {
      let button = matches.map((item: TMatch) => {
        let onClickBind = onClick.call(apiDispatch, item);

        if (user.position.level)
          switch (item.code) {
            case 1: {
              let okText = 'Согласовать ответственного';
              let okOnClick = onClickBind.ok().responsible;
              let cancelOnClick = onClickBind.cansel().responsible;

              return createButton(okText, okOnClick, cancelOnClick, item.isMatch);
            }
            case 2: {
              let okText = 'Согласовать перевод';
              let okOnClick = onClickBind.ok().transfer;
              let cancelOnClick = onClickBind.cansel().transfer;

              return createButton(okText, okOnClick, cancelOnClick, item.isMatch);
            }
            default:
              break;
          }

        if (item.code === 3 && currentResponsible === user.number) {
          let okText = 'Завизировать заявку';
          let okOnClick = onClickBind.ok().vise;
          let cancelOnClick = onClickBind.cansel().vise;

          return createButton(okText, okOnClick, cancelOnClick, item.isMatch);
        }

        return undefined;
      });

      return button;
    }
  }, [matches, user, apiDispatch, onClick, currentResponsible]);

  return (
    <>
      {jsxButton?.map((item: any, index: number) => {
        if (!item.isMatch)
          return (
            <ButtonGroup key={index}>
              <Button variant={item.okVariant} onClick={item.okOnClick} size="sm">
                <FontAwesomeIcon icon={faHandshake} className="mr-1" />
                {item.okText}
              </Button>
              <Button variant={item.cancelVariant} onClick={item.cancelOnClick} size="sm">
                <FontAwesomeIcon icon={faHandshakeSlash} className="mr-1" />
                {item.cancelText}
              </Button>
            </ButtonGroup>
          );
        else return undefined;
      })}
    </>
  );
};

export default memo(HandleMatches);
