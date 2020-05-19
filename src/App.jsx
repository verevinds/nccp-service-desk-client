import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { incidentCreate } from './redux/actionCreators/incidentAction';
import { categoryRequestSuccessed } from './redux/actionCreators/catalogAction';
import { authRequestSuccessed } from './redux/actionCreators/authAction';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import MainPage from './page/MainPage';
import SettingPage from './page/SettingPage';
import Header from './component/Header/Header';
import MyIncidentPage from './page/MyIncidentPage';
import axios from 'axios';
import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.214.106:8000');

const App = (props) => {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const catalog = useSelector((state) => state.catalog, shallowEqual);
  const status = useSelector((state) => state.status, shallowEqual);

  const state = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(state);
  }, [state]);
  useEffect(() => {
    // dispatch(authFetching(window.ipGlobal));
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
      });
    dispatch(
      queryApi({
        route: 'departments',
        actionSuccessed: departmentRequestSuccessed,
      }),
    );
    // eslint-disable-next-line
  }, [dispatch]);
  useEffect(() => {
    if (catalog.isUpdate) {
      dispatch(
        queryApi({
          route: 'categories',
          actionSuccessed: categoryRequestSuccessed,
        }),
      );
    }
  }, [catalog.isUpdate, dispatch]);
  useEffect(() => {
    if (status.isUpdate) {
      dispatch(
        queryApi({ route: 'status', actionSuccessed: statusRequestSeccessed }),
      );
    }
  }, [status.isUpdate, dispatch]);

  useEffect(() => {
    if (user)
      socket.on(String(user.departmentId), (data) => {
        dispatch(incidentCreate());
      });
  }, [user]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/setting" component={SettingPage} />
        <Route path="/myincidents" component={MyIncidentPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(App);
