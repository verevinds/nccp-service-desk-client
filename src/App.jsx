import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

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

const App = (props) => {
  const { status, catalog } = useSelector((state) => state);

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
