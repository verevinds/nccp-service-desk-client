import './images/logo.webp';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import openSocket from 'socket.io-client';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './App.tsx';
const PATH = process.env.REACT_APP_URL || 'srv-sdesk.c31.nccp.ru';
export const socket = openSocket(`${window.location.protocol}//${PATH}:8000`);

// const AppLazy = React.lazy(() => import('./App.tsx'));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
