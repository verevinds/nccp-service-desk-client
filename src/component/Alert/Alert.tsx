import React, { memo, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastiry.scss';
// import SpeechOn from '../../sounds/SpeechOn.mp3';

import openSocket from 'socket.io-client';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';

const socket = openSocket('http://192.168.213.77:8000');
interface Props {
  data: any;
  title: string;
}

const Alert: React.FC<Props> = () => {
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const newAlert = (data: any) => {
      dispatch(incidentCreate());
      toast.info(
        <div className={'alertCustom'}>
          <div className={'alertCustom__title'}>
            <span role="img" aria-label="inbox">
              📥
            </span>
            <h6>{`Поступил новый инцидент`}</h6>
          </div>
        </div>,
      );
    };
    socket.on(String(user?.departmentId), newAlert);
    // socket.on('test', newAlert);
    // eslint-disable-next-line
  }, [user, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
    />
  );
};

export default memo(Alert);
