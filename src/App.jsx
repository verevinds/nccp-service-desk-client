import React, { memo, useLayoutEffect, useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';

//** Pages */
import TestPage from './page/TestPage';
import MyIncidentPage from './page/MyIncidentPage';
import SettingPage from './page/SettingPage';
import MainPage from './page/MainPage';

//** Components */
import Header from './component/Header/Header';
import HandleSocket from './component/HandleSocket/HandleSocket';
import Alert from './component/Alert/Alert';
import { AlertContext } from './component/Alert/AlertContext';

//** Action Creators */
import { categoryRequestSuccessed } from './redux/actionCreators/catalogAction';
import { authRequestSuccessed, authInitialApp } from './redux/actionCreators/authAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import { accessRequestSeccessed } from './redux/actionCreators/accessAction';

/**Bootstrap components */
import { ProgressBar } from 'react-bootstrap';
import { incidentRequestSuccessed, myIncidentRequestSuccessed } from './redux/actionCreators/incidentAction';
import Cookies from 'universal-cookie';
import AuthModal from './component/AuthModal/AuthModal';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { usersRequestSeccessed } from './redux/actionCreators/usersAction';
import Axios from 'axios';
import InfoPage from './page/InfoPage';

const App = (props) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  //** Get State from Store */
  const isUpdateCatalog = useSelector((state) => state.catalog.isUpdate, shallowEqual);
  const isUpdateStatus = useSelector((state) => state.status.isUpdate, shallowEqual);
  const state = useSelector((state) => state, shallowEqual); // Получаем данные каталога при строгом изменение обекта state
  const { isUpdate } = useSelector((state) => state.incidents); // Получаем данные каталога при строгом изменение обекта state
  const { progress } = useSelector((state) => state);
  const { error } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);

  /** Local State */
  const [alert, setAlert] = useState();
  const [auth, setAuth] = useState(undefined);
  //** Local variable */
  let alertJsx = useMemo(() => {
    if (alert)
      return (
        <Alert
          text={alert.text}
          autoClose={alert.autoClose || undefined}
          type={alert.type || undefined}
          button={alert.button}
        />
      );
  }, [alert]);
  let errorAlert = useMemo(() => {
    if (error) return <Alert text={`ОШИБКА: ${error}`} type={'warn'} />;
  }, [error]);

  useLayoutEffect(() => {
    // console.log(state);
  }, [state]);
  useLayoutEffect(() => {
    if (!!cookies.get('auth')) {
      if (cookies.get('auth').ip) {
        dispatch(queryApi({ route: 'users', actionSuccessed: authRequestSuccessed, id: cookies.get('auth').number }));
      } else {
        dispatch(authRequestSuccessed(cookies.get('auth')));
        dispatch(departmentRequestSuccessed(JSON.parse(localStorage.getItem('departments'))));
        dispatch(categoryRequestSuccessed(JSON.parse(localStorage.getItem('categories'))));
        dispatch(incidentRequestSuccessed(JSON.parse(localStorage.getItem('incidents'))));
        dispatch(statusRequestSeccessed(JSON.parse(localStorage.getItem('status'))));
        dispatch(accessRequestSeccessed(JSON.parse(localStorage.getItem('access'))));
        dispatch(usersRequestSeccessed(JSON.parse(localStorage.getItem('users'))));
      }
    } else {
      Axios.get('https://api.nccp-eng.ru/?method=auth.start', {
        headers: {
          accept: '*/*',
          'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
        .then((res) => {
          return res;
        })
        .then((res) => {
          if (!res.data) {
            setAuth(<AuthModal />);
          } else {
            cookies.set('auth', res.data, { path: '/' });
            dispatch(queryApi({ route: 'users', actionSuccessed: authRequestSuccessed, id: res.data.number }));
            dispatch(authInitialApp(res.data));
          }
        })
        .catch((err) => {
          console.error(err);
          setAuth(<AuthModal />);
        });
      // setAuth(<AuthModal />);
    }
    // eslint-disable-next-line
  }, [dispatch]); // For change state of the  dispatch
  useEffect(() => {
    if (isUpdateCatalog) {
      dispatch(queryApi({ route: 'catalogs', actionSuccessed: departmentRequestSuccessed }));
    }
  }, [isUpdateCatalog, dispatch]);
  useEffect(() => {
    if (isUpdate) {
      dispatch(
        queryApi({
          route: 'incidents',
          actionSuccessed: incidentRequestSuccessed,
          params: { departmentId: user.departmentId },
        }),
      );

      dispatch(
        queryApi({
          route: 'incidents',
          actionSuccessed: myIncidentRequestSuccessed,
          params: { userNumber: user.number },
        }),
      );
    }
  }, [isUpdate, dispatch, user]);
  useEffect(() => {
    if (isUpdateStatus) {
      dispatch(queryApi({ route: 'status', actionSuccessed: statusRequestSeccessed }));
    }
  }, [isUpdateStatus, dispatch]);
  useEffect(() => {
    user && dispatch(authInitialApp(user));
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <AlertContext.Provider value={setAlert}>
        {auth}
        <Header />
        {alertJsx}
        <HandleSocket />
        {errorAlert}
        <div className={styles.progressBar}>
          <ProgressBar animated now={progress.now} hidden={progress.isFinish} />
        </div>

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/setting" component={SettingPage} />
          <Route path="/myincidents" component={MyIncidentPage} />
          <Route path="/test" component={TestPage} />
          <Route path="/info" component={InfoPage} />
        </Switch>
      </AlertContext.Provider>
    </BrowserRouter>
  );
};

export default memo(App);
