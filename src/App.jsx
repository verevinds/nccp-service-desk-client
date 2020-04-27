import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryFetching } from './redux/actionCreators/categoryAction';
import { authFetching } from './redux/actionCreators/authAction';

import MainPage from './page/MainPage';
import Header from './component/Header/Header';
import AdminPage from './page/AdminPage';

const App = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(authFetching(window.ipGlobal));
    dispatch(categoryFetching());
  }, []);
  console.log('state', state);
  return (
    <>
      <Header />
      {/* <MainPage /> */}
      <AdminPage />
    </>
  );
};
export default memo(App);
