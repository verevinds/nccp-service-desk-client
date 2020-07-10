import './images/logoZip.webp';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import openSocket from 'socket.io-client';

import './index.scss';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import SpinnerGrow from './component/SpinnerGrow/SpinnerGrow';
const PATH = process.env.REACT_APP_URL || 'srv-sdesk.c31.nccp.ru';
export const socket = openSocket(`${window.location.protocol}//${PATH}:8000`);

const AppLazy = React.lazy(() => import('./App.tsx'));
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<SpinnerGrow />}>
      <AppLazy />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
