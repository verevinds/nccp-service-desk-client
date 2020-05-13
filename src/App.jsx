import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { categoryRequestSuccessed } from './redux/actionCreators/catalogAction';
import { authFetching } from './redux/actionCreators/authAction';
import {
  incidentRequestSuccessed,
  myIncidentRequestSuccessed,
} from './redux/actionCreators/incidentAction';
import { queryApi } from './redux/actionCreators/queryApiAction';
import { departmentRequestSuccessed } from './redux/actionCreators/departmentAction';
import { statusRequestSeccessed } from './redux/actionCreators/statusAction';
import MainPage from './page/MainPage';
import SettingPage from './page/SettingPage';
import Header from './component/Header/Header';
import MyIncidentPage from './page/MyIncidentPage';

const App = (props) => {
  const {
    auth: { user },
    incidents,
    status,
    catalog,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // // console.log(state);

  useEffect(() => {
    dispatch(authFetching(window.ipGlobal));
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
    if (!!user && incidents.isUpdate) {
      dispatch(
        queryApi({
          route: 'incidents/my',
          actionSuccessed: myIncidentRequestSuccessed,
          id: user.number,
        }),
      );
      dispatch(
        queryApi({
          route: 'incidents/responsible',
          actionSuccessed: incidentRequestSuccessed,
          id: user.departmentId,
        }),
      );
    }
    // eslint-disable-next-line
  }, [user, incidents.isUpdate, dispatch]);
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
