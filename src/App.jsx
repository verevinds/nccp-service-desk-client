import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { categoryFetching } from './redux/actionCreators/catalogAction';
import { authFetching } from './redux/actionCreators/authAction';
import {
  incidentFetching,
  myIncidentRequestSuccessed,
} from './redux/actionCreators/incidentAction';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { categoryRequestSuccessed } from './redux/actionCreators/catalogAction';

import MainPage from './page/MainPage';
import SettingPage from './page/SettingPage';
import Header from './component/Header/Header';
import MyIncidentPage from './page/MyIncidentPage';

const App = (props) => {
  const state = useSelector((state) => state);
  const { auth } = state;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authFetching(window.ipGlobal));
    dispatch(categoryFetching());

    dispatch(incidentFetching());
    dispatch(queryApi('departments', departmentRequestSuccessed));
  }, [dispatch]);
  useEffect(() => {
    console.log(state);
  }, [state]);
  useEffect(() => {
    if (!!auth.user) {
      dispatch(
        queryApi(
          'incidents/my',
          myIncidentRequestSuccessed,
          'get',
          {},
          auth.user.number,
        ),
      );
      dispatch(
        queryApi(
          'incidents/responsible',
          categoryRequestSuccessed,
          'get',
          auth.user.departmentId,
        ),
      );
    }
  }, [auth]);
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
