import React, { memo, useLayoutEffect, useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastiry.scss';

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
import { authRequestSuccessed } from './redux/actionCreators/authAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import { accessRequestSeccessed } from './redux/actionCreators/accessAction';
import { filterSet } from './redux/actionCreators/filterAction';
import { incidentVisaRequestSuccessed } from './redux/actionCreators/incidentAction';
import {
  incidentAllowToCreateRequestSuccessed,
  incidentChoose,
} from './redux/actionCreators/incidentAction';
import { positionsRequestSeccessed } from './redux/actionCreators/positionAction';
import { settingRequestSuccessed } from './redux/actionCreators/settingAction';

/**Bootstrap components */
import { ProgressBar } from 'react-bootstrap';
import {
  incidentRequestSuccessed,
  myIncidentRequestSuccessed,
} from './redux/actionCreators/incidentAction';
import Cookies from 'universal-cookie';
import AuthModal from './component/AuthModal/AuthModal';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { usersRequestSeccessed } from './redux/actionCreators/usersAction';
import Axios from 'axios';
import InfoPage from './page/InfoPage';
import { versionSet } from './redux/actionCreators/versionAction';
import { AppContext } from './AppContext';
import MyDepartmentPage from './page/MyDepartmentPage';
import VisaPage from './page/VisaPage';
import { IState } from './interface';
import SpinnerGrow from './component/SpinnerGrow/SpinnerGrow';
import api from './js/api';
import { findById } from './js/supportingFunction';

const App = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  /** Local State */
  const [auth, setAuth] = useState<JSX.Element | undefined>();
  //** Get State from Store */
  const {
    progress,
    catalog: { isUpdate: isUpdateCatalog },
    status: { isUpdate: isUpdateStatus },
    positions: { isUpdate: isUpdatePositions },
    access: { isUpdate: isUpdateAccess },
    incidents: {
      isUpdate: isUpdateIncident,
      current: { incident },
      allowToCreate,
      history,
      list,
      myList,
      visa,
    },
    users: { isUpdate: isUpdateUsers },
    auth: { user },
    resources: { isUpdate: isUpdateResources },
  }: IState = useSelector((state: IState) => state);
  const apiDispatch = useMemo(() => api(dispatch), [dispatch]);

  /** Получить сохраненные данные из локального хранилища */
  useLayoutEffect(() => {
    const dispatchLocalStorage = (itemName: string, actionRequestSuccessed: any) => {
      const item = localStorage.getItem(itemName);
      const hasItem = !!item;
      const parseItem = hasItem ? JSON.parse(String(item)) : undefined;
      const hasParseItem = !!parseItem;

      if (hasParseItem) dispatch(actionRequestSuccessed(parseItem));
    };

    const auth = cookies.get('auth');
    const isAuth = !!auth?.number;

    if (isAuth) {
      dispatch(authRequestSuccessed(auth));
      dispatchLocalStorage(`access/${auth.number}`, accessRequestSeccessed);
      dispatchLocalStorage(`users/${auth.number}`, authRequestSuccessed);
    }

    dispatchLocalStorage('catalogs', departmentRequestSuccessed);
    dispatchLocalStorage('categories', categoryRequestSuccessed);
    dispatchLocalStorage('incidents/work', incidentRequestSuccessed);
    dispatchLocalStorage('incidents/department', incidentAllowToCreateRequestSuccessed);
    dispatchLocalStorage('incidents/my', myIncidentRequestSuccessed);
    dispatchLocalStorage('incidents/visa', incidentVisaRequestSuccessed);
    dispatchLocalStorage('positions', positionsRequestSeccessed);
    dispatchLocalStorage('status', statusRequestSeccessed);
    dispatchLocalStorage('users', usersRequestSeccessed);
    dispatchLocalStorage('filter', filterSet);
    // eslint-disable-next-line
  }, [dispatch]);
  /** Авторизация пользователя */
  useLayoutEffect(() => {
    dispatch(queryApi({ route: 'settings', actionSuccessed: settingRequestSuccessed }));

    if (!!cookies.get('auth')) {
      dispatch(
        queryApi({
          route: 'users',
          actionSuccessed: authRequestSuccessed,
          id: cookies.get('auth').number,
        }),
      );
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
          // //@ts-ignore
          res.data.number = 81251;
          // //@ts-ignore
          // res.data.ip = '192.168.214.106';
          if (!res.data) {
            setAuth(<AuthModal />);
          } else {
            let isNumber = Number(res.data.number) === 0;

            if (isNumber) throw new Error();

            cookies.set('auth', res.data, { path: '/' });

            dispatch(
              queryApi({
                route: 'users',
                actionSuccessed: authRequestSuccessed,
                id: res.data.number,
              }),
            );

            // dispatch(authInitialApp(res.data));
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
  /** Загрузка и обновление информации по отделам */
  useLayoutEffect(() => {
    //Загружаем "дерево": Отдел->Каталог->Параматр/Опция
    apiDispatch.catalogs().get();
    //Загружаем "дерево": Каталог->Параматр/Опция
    apiDispatch.categories().get();
  }, [isUpdateCatalog, dispatch, apiDispatch]);
  /** Загрузка и обновление информации по должностям */
  useLayoutEffect(() => {
    apiDispatch.positions().get();
  }, [isUpdatePositions, apiDispatch]);
  /** Загрузка и обновление информации по инцидентам*/
  useLayoutEffect(() => {
    if (!!user) {
      apiDispatch.incidents().work(user).get();
      apiDispatch.incidents().department(user).get();
      apiDispatch.incidents().my(user).get();
      apiDispatch.incidents().visa(user).get();
    }
  }, [isUpdateIncident, user, apiDispatch]);
  /** Загрузка и обновление информации по статусам */
  useLayoutEffect(() => {
    apiDispatch.status().get();
  }, [isUpdateStatus, apiDispatch]);
  /** Загрузка и обновление информации по доступу */
  useLayoutEffect(() => {
    if (!!user) {
      const id = user?.number;
      apiDispatch.access().get(id);
    }
  }, [isUpdateAccess, apiDispatch, user]);
  /** Загрузка и обновление информации по сотрудникам */
  useLayoutEffect(() => {
    apiDispatch.users().get();
  }, [isUpdateUsers, apiDispatch]);
  /** Занрузка и обновление ресурсов */
  useLayoutEffect(() => {
    if (user) apiDispatch.resources().get({ creatorDepartmentId: user.departmentId });
  }, [isUpdateResources, apiDispatch, user]);
  //** Если обновляется заявка, то обновляем выбранную заявку */
  useEffect(() => {
    if (incident) {
      const { id } = incident;

      let foundAllowToCreate = findById(allowToCreate, id);
      let foundHistory = findById(history, id);
      let foundList = findById(list, id);
      let foundMyList = findById(myList, id);
      let foundVisa = findById(visa, id);

      dispatch(
        incidentChoose(foundAllowToCreate || foundHistory || foundList || foundMyList || foundVisa),
      );
    }
  }, [allowToCreate, history, list, myList, visa, dispatch, incident]);

  if (!!user)
    return (
      <AppContext.Provider value={{ apiDispatch }}>
        <BrowserRouter>
          <Header />
          <HandleSocket />
          <ToastContainer
            position='top-right'
            autoClose={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
          <div className={styles.progressBar}>
            <ProgressBar animated now={progress.now} hidden={progress.isFinish} />
          </div>

          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/incident/:id' component={MainPage} />
            <Route path='/incident' component={MainPage} />
            <Route path='/setting' component={SettingPage} />
            <Route path='/myincidents/:id' component={MyIncidentPage} />
            <Route path='/myincidents' component={MyIncidentPage} />
            <Route path='/test' component={TestPage} />
            <Route path='/info' component={InfoPage} />
            <Route path='/MyDepartmentPage' component={MyDepartmentPage} />
            <Route path='/visa' component={VisaPage} />
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    );
  else
    return (
      <>
        <SpinnerGrow />
        {auth}
      </>
    );
};

export default memo(App);
