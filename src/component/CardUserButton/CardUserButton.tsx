import React, { memo, Fragment, useMemo, useCallback } from 'react';
import { Card, Image, Col, Row, Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TUsers, IState } from '../../interface';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { usersCurrentUpdate } from '../../redux/actionCreators/usersAction';

export interface ICardUserButton {}

const CardUserButton: React.FC<ICardUserButton> = (props) => {
  const {
    current: { user, isUpdate },
  }: TUsers = useSelector((state: IState) => state.users);
  const dispatch = useDispatch();

  const provideAccess = useCallback(
    ({ method, access }) => {
      let data = { access, userNumber: user?.number };
      dispatch(
        queryApi({
          route: 'access',
          method,
          actionUpdate: usersCurrentUpdate,
          data: method === 'post' ? data : undefined,
          id: method === 'delete' ? user?.number : undefined,
          params: method === 'delete' ? data : undefined,
        }),
      );
    },
    [user, dispatch],
  );

  const buttonAccess = useMemo(() => {
    let button = [];

    if (user) {
      if (~user.accesses.findIndex((item: any) => item.access === 1))
        button[0] = {
          variant: 'outline-danger',
          check: true,
          onClick: provideAccess.bind(null, { access: 1, method: 'delete' }),
          text: 'Настройки отдела',
        };
      else
        button[0] = {
          variant: 'outline-primary',
          onClick: provideAccess.bind(null, { access: 1, method: 'post' }),
          text: 'Настройки отдела',
        };

      if (~user.accesses.findIndex((item: any) => item.access === 999))
        button[1] = {
          variant: 'outline-danger',
          check: true,
          onClick: provideAccess.bind(null, { access: 999, method: 'delete' }),
          text: 'Суперпользователь',
        };
      else
        button[1] = {
          variant: 'outline-primary',
          onClick: provideAccess.bind(null, { access: 999, method: 'post' }),
          text: 'Суперпользователь',
        };
    }
    return button;
  }, [provideAccess, user]);
  return (
    <Fragment>
      <hr />
      <DropdownButton id="dropdown-basic-button" title="Доступы" size="sm">
        {buttonAccess.map((item: any, index: number) => (
          <Dropdown.Item key={index} as={Button} variant={item.variant} onClick={item.onClick} size="sm">
            {item.check ? <FontAwesomeIcon icon={faCheck} className={'mr-1'} color="green" /> : undefined}
            {item.text}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Fragment>
  );
};

export default memo(CardUserButton);
