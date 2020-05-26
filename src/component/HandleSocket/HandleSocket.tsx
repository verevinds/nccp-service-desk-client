import React, { memo, useEffect, useState, useContext } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { AlertContext } from '../Alert/AlertContext';
// import SpeechOn from '../../sounds/SpeechOn.mp3';

import openSocket from 'socket.io-client';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';

const socket = openSocket('http://192.168.213.77:8000');
interface Props {
  data: any;
  title: string;
}

const HandleSocket: React.FC<Props> = () => {
  const setAlert = useContext(AlertContext);
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const newAlert = (data: any) => {
      dispatch(incidentCreate());
      setAlert({ type: 'info', text: `Поступил новый инцидент` });
    };

    socket.on(String(user?.departmentId), newAlert);
  }, [user, dispatch, setAlert]);

  return <></>;
};

export default memo(HandleSocket);
