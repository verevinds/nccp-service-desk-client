import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';
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
import { authRequestSuccessed } from './redux/actionCreators/authAction';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import { accessRequestSeccessed } from './redux/actionCreators/accessAction';
import {
  progressStart,
  progressStep,
  progressFinish,
} from './redux/actionCreators/progressAction';

/**Bootstrap components */
import { ProgressBar, Spinner } from 'react-bootstrap';
import { incidentRequestSuccessed } from './redux/actionCreators/incidentAction';

const App = (props) => {
  const dispatch = useDispatch();
  //** Get State from Store */
  const isUpdateCatalog = useSelector(
    (state) => state.catalog.isUpdate,
    shallowEqual,
  ); // Получаем данные каталога при строгом изменение обекта isUpdate
  const isUpdateStatus = useSelector(
    (state) => state.status.isUpdate,
    shallowEqual,
  ); // Получаем данные каталога при строгом изменение обекта status
  const user = useSelector((state) => state.auth?.user, shallowEqual); // Получаем данные каталога при строгом изменение обекта user
  const state = useSelector((state) => state, shallowEqual); // Получаем данные каталога при строгом изменение обекта state
  const { progress } = useSelector((state) => state); // Получаем данные каталога при строгом изменение обекта state

  /** Local State */
  const [alert, setAlert] = useState();

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

  //** Sider Effect */
  useEffect(() => {
    // console.log(state.incidents);
  }, [state.incidents]); // For change state of the state

  useEffect(() => {
    if (!!user) {
      dispatch(
        queryApi({
          route: 'access',
          actionSuccessed: accessRequestSeccessed,
          id: user.number,
        }),
      );
      dispatch(progressStep(20));

      dispatch(
        queryApi({
          route: 'incidents',
          actionSuccessed: incidentRequestSuccessed,
          params: { departmentId: user.departmentId },
        }),
      );
      dispatch(progressFinish());
    }
  }, [user, dispatch]); // For change state of the user & dispatch

  useLayoutEffect(() => {
    dispatch(progressStart());
    axios
      .get('http://api.nccp-eng.ru/', {
        params: {
          method: 'auth.start',
        },
      })
      .then((res) => {
        dispatch(
          queryApi({
            route: 'users',
            actionSuccessed: authRequestSuccessed,
            params: { number: res.data.number },
          }),
        );
        dispatch(progressStep(16));
      });
    dispatch(progressStep(16));

    dispatch(
      queryApi({
        route: 'departments',
        actionSuccessed: departmentRequestSuccessed,
      }),
    );
    dispatch(progressStep(16));
    // eslint-disable-next-line
  }, [dispatch]); // For change state of the  dispatch

  useEffect(() => {
    if (isUpdateCatalog) {
      dispatch(
        queryApi({
          route: 'categories',
          actionSuccessed: categoryRequestSuccessed,
        }),
      );
      dispatch(progressStep(16));
    }
  }, [isUpdateCatalog, dispatch]); // For change state of the isUpdateCatalog, dispatch

  useEffect(() => {
    if (isUpdateStatus) {
      dispatch(
        queryApi({ route: 'status', actionSuccessed: statusRequestSeccessed }),
      );
      dispatch(progressStep(16));
    }
  }, [isUpdateStatus, dispatch]); // For change state of the isUpdateStatus, dispatch

  return (
    <BrowserRouter>
      <AlertContext.Provider value={setAlert}>
        <Header />
        {alertJsx}
        <HandleSocket />
        <div className={styles.progressBar}>
          <ProgressBar animated now={progress.now} hidden={progress.isFinish} />
        </div>
        {progress.isFinish ? (
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/setting" component={SettingPage} />
            <Route path="/myincidents" component={MyIncidentPage} />
            <Route path="/test" component={TestPage} />
          </Switch>
        ) : (
          <div className={styles.spinner}>
            <Spinner animation="border" role="status" variant="primary">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
      </AlertContext.Provider>
    </BrowserRouter>
  );
};

export default memo(App);
