import React, { memo, useLayoutEffect, useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastiry.scss';
import dateNow from './js/dateNow';

//** Pages */
import TestPage from './page/TestPage';
import MyIncidentPage from './page/MyIncidentPage';
import SettingPage from './page/SettingPage';
import MainPage from './page/MainPage';

//** Components */
import Header from './component/Header/Header';
import HandleSocket from './component/HandleSocket/HandleSocket';

//** Action Creators */
import { categoryRequestSuccessed } from './redux/actionCreators/catalogAction';
import { authRequestSuccessed, authInitialApp } from './redux/actionCreators/authAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import { accessRequestSeccessed } from './redux/actionCreators/accessAction';
import { filterSet } from './redux/actionCreators/filterAction';
import { incidentCreate } from './redux/actionCreators/incidentAction';

/**Bootstrap components */
import { ProgressBar } from 'react-bootstrap';
import { incidentRequestSuccessed, myIncidentRequestSuccessed } from './redux/actionCreators/incidentAction';
import Cookies from 'universal-cookie';
import AuthModal from './component/AuthModal/AuthModal';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { usersRequestSeccessed } from './redux/actionCreators/usersAction';
import Axios from 'axios';
import InfoPage from './page/InfoPage';
import { versionSet } from './redux/actionCreators/versionAction';
import { AppContext } from './AppContext';

const App = (props) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  /** Local State */
  const [auth, setAuth] = useState(undefined);
  //** Get State from Store */
  const isUpdateCatalog = useSelector((state) => state.catalog.isUpdate);
  const isUpdateStatus = useSelector((state) => state.status.isUpdate);
  const isUpdateIncident = useSelector((state) => state.incidents.isUpdate); // Получаем данные каталога при строгом изменение обекта state
  const { progress } = useSelector((state) => state);
  const { user } = useSelector((state) => state.auth);
  const incident = useSelector((state) => state.incidents?.current.incident);

  const initialApp = useCallback(() => {
    dispatch(authRequestSuccessed(cookies.get('auth')));
    dispatch(departmentRequestSuccessed(JSON.parse(localStorage.getItem('departments'))));
    dispatch(categoryRequestSuccessed(JSON.parse(localStorage.getItem('categories'))));
    dispatch(incidentRequestSuccessed(JSON.parse(localStorage.getItem('incidents'))));
    dispatch(statusRequestSeccessed(JSON.parse(localStorage.getItem('status'))));
    dispatch(accessRequestSeccessed(JSON.parse(localStorage.getItem('access'))));
    dispatch(usersRequestSeccessed(JSON.parse(localStorage.getItem('users'))));
    // eslint-disable-next-line
  }, [dispatch]);

  useLayoutEffect(() => {
    if (!!cookies.get('auth')) {
      if (cookies.get('auth').ip) {
        dispatch(
          queryApi({
            route: 'users',
            actionSuccessed: authRequestSuccessed,
            id: cookies.get('auth').number,
          }),
        );
      } else {
        initialApp();
      }
    } else {
      Axios.get(`${window.location.protocol}//api.nccp-eng.ru/?method=auth.start`, {
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
            if (Number(res.data.number) === 0) throw new Error();
            cookies.set('auth', res.data, { path: '/' });
            dispatch(
              queryApi({
                route: 'users',
                actionSuccessed: authRequestSuccessed,
                id: res.data.number,
              }),
            );
            dispatch(authInitialApp(res.data));
          }
        })
        .catch((err) => {
          console.error(err);
          setAuth(<AuthModal />);
        });
    }
    dispatch(versionSet(process.env.REACT_APP_VERSION));
    // eslint-disable-next-line
  }, [dispatch]); // For change state of the  dispatch

  useEffect(() => {
    if (isUpdateCatalog) {
      dispatch(
        queryApi({
          route: 'catalogs',
          actionSuccessed: departmentRequestSuccessed,
        }),
      );
      dispatch(
        queryApi({
          route: 'categories',
          actionSuccessed: categoryRequestSuccessed,
        }),
      );
    }
  }, [isUpdateCatalog, dispatch]);

  useEffect(() => {
    if (isUpdateIncident) {
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
  }, [isUpdateIncident, dispatch, user]);

  useEffect(() => {
    if (isUpdateStatus) {
      dispatch(queryApi({ route: 'status', actionSuccessed: statusRequestSeccessed }));
    }
  }, [isUpdateStatus, dispatch]);
  useEffect(() => {
    user && dispatch(authInitialApp(user));
  }, [user, dispatch]);

  useEffect(() => {
    let filterNoParse = localStorage.getItem('filter');
    let filter = !!filterNoParse && JSON.parse(filterNoParse);
    dispatch(filterSet(filter));
  }, [dispatch]);

  const dispatchQueryApi = useMemo(() => {
    return {
      comments(text) {
        dispatch(
          queryApi({
            route: 'comments',
            method: 'post',
            actionUpdate: incidentCreate,
            data: {
              userNumber: user.number,
              incidentId: incident.id,
              text,
            },
          }),
        );
      },
      incidents(props) {
        dispatch(
          queryApi({
            method: 'put',
            route: 'incidents',
            id: incident.id,
            ...props,
            data: {
              startWork: dateNow(),
              statusId: Number(1),
              ...props.data,
            },
          }),
        );
      },
      match(props) {
        dispatch(
          queryApi({
            ...props,
            route: 'matches',
          }),
        );
      },
    };
  }, [dispatch, incident, user]);

  return (
    <AppContext.Provider value={{ dispatchQueryApi }}>
      <BrowserRouter>
        {auth}
        <Header />
        <HandleSocket />
        <ToastContainer
          position="top-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <div className="bg">
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
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default memo(App);
