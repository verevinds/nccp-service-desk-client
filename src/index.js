import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import openSocket from 'socket.io-client';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './App';
const PATH = process.env.REACT_APP_URL || 'srv-sdesk.c31.nccp.ru';
console.log(`${window.location.protocol}//${PATH}:8000`);
export const socket = openSocket(`${window.location.protocol}//${PATH}:8000`);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// // Проверка того, что наш браузер поддерживает Service Worker API.
// if ('serviceWorker' in navigator) {
//   // Весь код регистрации у нас асинхронный.
//   navigator.serviceWorker
//     .register('./sw.js')
//     .then(() =>
//       navigator.serviceWorker.ready.then((worker) => {
//         worker.sync.register('syncdata');
//       }),
//     )
//     .catch((err) => console.log(err));
// }
