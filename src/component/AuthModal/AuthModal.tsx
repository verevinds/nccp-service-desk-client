import React, { memo, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import ModalWindow from '../ModalWindow/ModalWindow';
import Cookies from 'universal-cookie';

import { AlertContext } from '../Alert/AlertContext';

import Axios from 'axios';
import { authInitialApp, authRequestSuccessed } from '../../redux/actionCreators/authAction';
import { queryApi } from '../../redux/actionCreators/queryApiAction';

interface AuthModal {}
const AuthModal: React.FC<AuthModal> = () => {
  const cookies = new Cookies();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const setAlert = useContext(AlertContext);
  const dispatch = useDispatch();
  function Alert() {
    return {
      error: () =>
        setAlert({
          type: 'warn',
          text: (
            <>
              <b>Логин или пароль не верные</b>
            </>
          ),
          autoClose: 3000,
        }),
      success: () =>
        setAlert({
          type: 'success',
          text: (
            <>
              <b>Добро пожаловать!</b>
            </>
          ),
          autoClose: 3000,
        }),
    };
  }
  return (
    <ModalWindow
      show={show}
      title={'Авторизация'}
      onOk={() => {}}
      textOk={'Войти'}
      onSubmit={(event) => {
        event.preventDefault();

        Axios.get(`${window.location.protocol}://api.nccp-eng.ru/?method=auth.direct`, {
          headers: {
            accept: '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          params: { login, password },
        })
          .then((res) => {
            console.log(res);
            if (Array.isArray(res.data) && String(res.data[0]) === 'Error') {
              Alert().error();
            } else {
              Alert().success();
              dispatch(queryApi({ route: 'users', actionSuccessed: authRequestSuccessed, id: res.data.number }));

              dispatch(authInitialApp(res.data));
              if (!cookies.get('auth') && res.data) {
                cookies.set('auth', res.data, { path: '/' });
              }
              setShow(false);
            }
          })
          .catch((err) => {
            Alert().error();
          });
      }}
    >
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Введите Ваш логин"
            aria-label="Введите Ваш логин"
            aria-describedby="basic-addon2"
            onChange={(event: React.FocusEvent<HTMLInputElement>) => {
              setLogin(event.currentTarget.value);
            }}
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon2">@c31.nccp.ru</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Введите Ваш пароль"
            aria-label="Введите Ваш пароль"
            aria-describedby="basic-addon2"
            type="password"
            onChange={(event: React.FocusEvent<HTMLInputElement>) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </InputGroup>
      </>
    </ModalWindow>
  );
};

export default memo(AuthModal);
