import React, { memo, useMemo, useContext, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { IState, TIncidentCurrent, TMatch, TUser } from '../../interface';
import { AppContext, IDispatchQueryApi } from '../../AppContext';

const HandleMatches = () => {
  const {
    incident: { matches, currentResponsible },
  }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current, shallowEqual);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { dispatchQueryApi } = useContext(AppContext);

  const onClick = useCallback(function (this: IDispatchQueryApi, item: TMatch) {
    return {
      ok: () => {
        let match = () => this.match({ method: 'put', data: { isMatch: true }, id: item.id });

        return {
          responsible: () => {
            this.comments(`Ответственный согласован`);
            this.incidents({ data: { startWork: new Date(), statusId: 1 } });
            match();
          },
          transfer: () => {
            this.comments(`Перевод согласован`);
            this.incidents({ data: { startWork: null, statusId: 0, currentResponsible: null, ...item.params } });
            match();
          },
          vise: () => {
            this.comments(`Заявка завизирована`);
            this.incidents({ data: { statusId: 1, ...item.params } });
            match();
          },
        };
      },
      cansel: () => {
        let match = () => this.match({ method: 'delete', id: item.id });

        return {
          responsible: () => {
            this.comments(`Отказано в назначение ответственного`);
            this.incidents({ data: { startWork: null, statusId: 0, currentResponsible: null } });
            match();
          },
          transfer: () => {
            this.comments(`Отказано в переводе`);
            match();
          },
          vise: () => {
            this.comments(`Заявка не завизирована`);
            match();
          },
        };
      },
    };
  }, []);

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
    if (dispatchQueryApi) {
      let button = matches.map((item: TMatch) => {
        let onClickBind = onClick.call(dispatchQueryApi, item);

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
  }, [matches, user, dispatchQueryApi, onClick, currentResponsible]);

  return (
    <>
      {jsxButton?.map((item: any, index: number) => {
        if (!item.isMatch)
          return (
            <ButtonGroup key={index}>
              <Button variant={item.okVariant} onClick={item.okOnClick}>
                {item.okText}
              </Button>
              <Button variant={item.cancelVariant} onClick={item.cancelOnClick}>
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
