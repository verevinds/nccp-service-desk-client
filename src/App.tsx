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
import { authRequestSuccessed, authInitialApp } from './redux/actionCreators/authAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import { accessRequestSeccessed } from './redux/actionCreators/accessAction';
import { filterSet } from './redux/actionCreators/filterAction';
import { incidentCreate, incidentVisaRequestSuccessed } from './redux/actionCreators/incidentAction';
import { incidentAllowToCreateRequestSuccessed, incidentChoose } from './redux/actionCreators/incidentAction';
import { positionsRequestSeccessed } from './redux/actionCreators/positionAction';
import { settingRequestSuccessed } from './redux/actionCreators/settingAction';

/**Bootstrap components */
import { ProgressBar } from 'react-bootstrap';
import { incidentRequestSuccessed, myIncidentRequestSuccessed } from './redux/actionCreators/incidentAction';
import Cookies from 'universal-cookie';
import AuthModal from './component/AuthModal/AuthModal';
import { queryApi, IQueryApi } from './redux/actionCreators/queryApiAction';
import { usersRequestSeccessed } from './redux/actionCreators/usersAction';
import Axios from 'axios';
import InfoPage from './page/InfoPage';
import { versionSet } from './redux/actionCreators/versionAction';
import { AppContext } from './AppContext';
import MyDepartmentPage from './page/MyDepartmentPage';
import { paramsIncident } from './js/paramsIncident';
import VisaPage from './page/VisaPage';
import { IState, TIncident } from './interface';
import SpinnerGrow from './component/SpinnerGrow/SpinnerGrow';

const App = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  /** Local State */
  const [auth, setAuth] = useState<JSX.Element | undefined>();
  //** Get State from Store */
  const {
    progress,
    catalog: { isUpdate: isUpdateCatalog, isLoading: isLoadingCatalog },
    status: { isUpdate: isUpdateStatus, isLoading: isLoadingStatus },
    positions: { isUpdate: isUpdatePositions, isLoading: isLoadingPositions },
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
  }: IState = useSelector((state: IState) => state);

  const Api = useMemo(() => {
    return {
      catalogs(props: IQueryApi) {
        dispatch(
          queryApi({
            route: 'catalogs',
            actionSuccessed: departmentRequestSuccessed,
            ...props,
            data: {
              ...props.data,
            },
          }),
        );

        dispatch(
          queryApi({
            route: 'categories',
            actionSuccessed: categoryRequestSuccessed,
          }),
        );
      },
      comments(text: string) {
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
      incidents(props: IQueryApi) {
        dispatch(
          queryApi({
            method: 'put',
            route: 'incidents',
            id: incident?.id,
            ...props,
            data: {
              ...props.data,
            },
          }),
        );
      },
      match(props: IQueryApi) {
        dispatch(
          queryApi({
            route: 'matches',
            ...props,
          }),
        );
      },
    };
  }, [dispatch, incident, user]);
  const hasUser = useMemo(() => !!user?.number, [user]);

  /** Получить сохраненные данные из локального хранилища */
  useLayoutEffect(() => {
    const dispatchLocalStorage = (itemName: string, actionRequestSuccessed: any) => {
      let item = localStorage.getItem(itemName);
      let hasItem = !!item;
      let parseItem = hasItem ? JSON.parse(String(item)) : undefined;
      let hasParseItem = !!parseItem;

      if (hasParseItem) dispatch(actionRequestSuccessed(parseItem));
    };

    let auth = cookies.get('auth');
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
    dispatch(
      queryApi({
        route: 'catalogs',
        actionSuccessed: departmentRequestSuccessed,
      }),
    );
    //Загружаем "дерево": Каталог->Параматр/Опция
    dispatch(
      queryApi({
        route: 'categories',
        actionSuccessed: categoryRequestSuccessed,
      }),
    );
  }, [isUpdateCatalog, dispatch]);
  /** Загрузка и обновление информации по должностям */
  useLayoutEffect(() => {
    dispatch(
      queryApi({
        actionSuccessed: positionsRequestSeccessed,
        route: 'positions',
      }),
    );
  }, [isUpdatePositions, dispatch]);
  /** Загрузка и обновление информации по инцидентам*/
  useLayoutEffect(() => {
    if (hasUser) {
      let params = paramsIncident(user);

      /** Получить инциденты "рабочей панели" */
      Api.incidents({
        method: 'get',
        route: 'incidents/work',
        actionSuccessed: incidentRequestSuccessed,
        params: { ...params, hasVisa: true },
        id: undefined,
      });

      /** Получить инциденты "мой отдел" */
      Api.incidents({
        method: 'get',
        route: 'incidents/department',
        actionSuccessed: incidentAllowToCreateRequestSuccessed,
        params: { departmentId: user?.departmentId, allowToCreate: false },
        id: undefined,
      });

      /** Получить инциденты "мои заявки" */
      Api.incidents({
        method: 'get',
        route: 'incidents/my',
        actionSuccessed: myIncidentRequestSuccessed,
        params: { userNumber: user?.number },
        id: undefined,
      });

      /** Получить инциденты "мои согласование" */
      Api?.incidents({
        method: 'get',
        route: 'incidents/visa',
        actionSuccessed: incidentVisaRequestSuccessed,
        params: { hasVisa: false, positionId: user?.positionId },
        id: undefined,
      });
    }
    // eslint-disable-next-line
  }, [isUpdateIncident, dispatch, user, hasUser]);
  /** Загрузка и обновление информации по статусам */
  useLayoutEffect(() => {
    dispatch(queryApi({ route: 'status', actionSuccessed: statusRequestSeccessed }));
  }, [isUpdateStatus, dispatch]);
  /** Загрузка и обновление информации по доступу */
  useLayoutEffect(() => {
    if (hasUser) dispatch(queryApi({ route: 'access', actionSuccessed: accessRequestSeccessed, id: user.number }));
  }, [isUpdateStatus, dispatch, hasUser]);
  /** Загрузка и обновление информации по сотрудникам */
  useLayoutEffect(() => {
    dispatch(queryApi({ route: 'users', actionSuccessed: usersRequestSeccessed }));
  }, [isUpdateUsers]);

  //** Если обновляется заявка, то обновляем выбранную заявку */
  useEffect(() => {
    if (incident) {
      let incidentById = (item: TIncident) => item.id === incident.id;

      let foundAllowToCreate = allowToCreate.find(incidentById);
      let foundHistory = history.find(incidentById);
      let foundList = list.find(incidentById);
      let foundMyList = myList.find(incidentById);
      let foundVisa = visa.find(incidentById);

      dispatch(incidentChoose(foundAllowToCreate || foundHistory || foundList || foundMyList || foundVisa));
    }
  }, [allowToCreate, history, list, myList, visa]);
  if (hasUser)
    return (
      <AppContext.Provider value={{ Api }}>
        <BrowserRouter>
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
              <Route path="/myincidents/:id" component={MyIncidentPage} />
              <Route path="/myincidents" component={MyIncidentPage} />
              <Route path="/test" component={TestPage} />
              <Route path="/info" component={InfoPage} />
              <Route path="/MyDepartmentPage" component={MyDepartmentPage} />
              <Route path="/visa" component={VisaPage} />
            </Switch>
          </div>
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
