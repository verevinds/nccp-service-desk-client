import React, { memo, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastiry.scss';
import useSound from 'use-sound';

import openSocket from 'socket.io-client';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';

const socket = openSocket('http://192.168.214.106:8000');
interface Props {
  data: any;
  title: string;
}

const Alert: React.FC<Props> = () => {
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const dispatch = useDispatch();
  const [play] = useSound('../../sounds/SpeechOn.wav', {
    volume: 1,
  });

  useEffect(() => {
    socket.on(String(user?.departmentId), (data: any) => {
      dispatch(incidentCreate());
      play();
      toast.info(
        <div className={'alertCustom'}>
          <div className={'alertCustom__title'}>
            <span role="img" aria-label="inbox">
              📥
            </span>
            <h6>Поступил новый инцидент</h6>
          </div>
        </div>,
      );
    });
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
