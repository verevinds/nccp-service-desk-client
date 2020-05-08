import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { categoryFetching } from './redux/actionCreators/catalogAction';
import { authFetching } from './redux/actionCreators/authAction';
import { incidentFetching } from './redux/actionCreators/incidentAction';

import MainPage from './page/MainPage';
import SettingPage from './page/SettingPage';
import Header from './component/Header/Header';
import MyIncidentPage from './page/MyIncidentPage';

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authFetching(window.ipGlobal));
    dispatch(categoryFetching());
    dispatch(incidentFetching());
  }, [dispatch]);

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
