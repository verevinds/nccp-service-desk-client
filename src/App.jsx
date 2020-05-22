import React, { memo, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { categoryRequestSuccessed } from './redux/actionCreators/catalogAction';
import { authRequestSuccessed } from './redux/actionCreators/authAction';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import { accessRequestSeccessed } from './redux/actionCreators/accessAction';
import MainPage from './page/MainPage';
import SettingPage from './page/SettingPage';
import Header from './component/Header/Header';
import MyIncidentPage from './page/MyIncidentPage';
import axios from 'axios';
import Alert from './component/Alert/Alert';

const App = (props) => {
  const catalog = useSelector((state) => state.catalog, shallowEqual);
  const status = useSelector((state) => state.status, shallowEqual);
  const user = useSelector((state) => state.auth?.user, shallowEqual);
  const state = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(state);
  }, [state]);
  useEffect(() => {
    if (!!user)
      dispatch(
        queryApi({
          route: 'access',
          actionSuccessed: accessRequestSeccessed,
          id: user.number,
        }),
      );
  }, [user, dispatch]);
  useLayoutEffect(() => {
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

  return (
    <BrowserRouter>
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/setting" component={SettingPage} />
        <Route path="/myincidents" component={MyIncidentPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(App);
