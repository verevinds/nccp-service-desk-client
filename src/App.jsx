import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { categoryFetching } from './redux/actionCreators/catalogAction';
import { authFetching } from './redux/actionCreators/authAction';

import MainPage from './page/MainPage';
import Header from './component/Header/Header';
import AdminPage from './page/AdminPage';

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authFetching(window.ipGlobal));
    dispatch(categoryFetching());
  }, [dispatch]);

  return (
    <>
      <Header />
      <MainPage />
      <AdminPage />
    </>
  );
};
export default memo(App);
