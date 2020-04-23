import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import MainPage from './page/MainPage';
import * as serviceWorker from './serviceWorker';
import Header from './component/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Header />
    <MainPage />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
