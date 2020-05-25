import React, { memo, useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Alert from '../Alert/Alert';
// import SpeechOn from '../../sounds/SpeechOn.mp3';

import openSocket from 'socket.io-client';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';

const socket = openSocket('http://192.168.213.77:8000');
interface Props {
  data: any;
  title: string;
}

const HandleSocket: React.FC<Props> = () => {
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState<JSX.Element | undefined>(undefined);

  useEffect(() => {
    const newAlert = (data: any) => {
      dispatch(incidentCreate());
      console.log(data);
      setAlert(<Alert type={'info'} text={`Поступил новый инцидент`} />);
    };

    socket.on(String(user?.departmentId), newAlert);
  }, [user, dispatch]);

  return <>{alert}</>;
};

export default memo(HandleSocket);
