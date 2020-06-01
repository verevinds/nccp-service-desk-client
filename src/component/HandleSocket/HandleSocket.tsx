import React, { memo, useEffect, useContext, useState, useMemo } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { AlertContext } from '../Alert/AlertContext';
// import SpeechOn from '../../sounds/SpeechOn.mp3';
import { Button } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import openSocket from 'socket.io-client';
import {
  incidentCreate,
  incidentChoose,
} from '../../redux/actionCreators/incidentAction';
import ModalWindow from '../ModalWindow/ModalWindow';
import IncidentWindow from '../IncidentWindow/IncidentWindow';

const socket = openSocket('http://srv-sdesk.c31.nccp.ru:8000');

const HandleSocket = () => {
  const setAlert = useContext(AlertContext);
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const { list } = useSelector((state: any) => state.incidents, shallowEqual);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ id: undefined });
  const { incident, isChange } = useSelector(
    (state: any) => state.incidents.current,
    shallowEqual,
  );

  useEffect(() => {
    const newAlert = (data: any) => {
      dispatch(incidentCreate());
      setAlert({
        type: 'info',
        text: <>Поступил новый инцидент №{data.data.id}</>,
        button: (
          <>
            <Button
              size="sm"
              variant="outline-info"
              onClick={() => {
                setShow(!show);
                setData(data.data);
              }}
            >
              <span>Посмотреть </span>
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </>
        ),
      });
    };

    socket.on(String(user?.departmentId), newAlert);
  }, [user, dispatch, setAlert, show]);

  useEffect(() => {
    if (!!data.id || isChange || !incident) {
      const newCurrentIncident = (() => {
        let thisList = list.find((item: any) => item.id === data?.id);
        if (thisList) return thisList;
      })();
      dispatch(incidentChoose(newCurrentIncident));
    }
  }, [list, data, dispatch, isChange, show, incident]);

  const jsx = useMemo(() => {
    return (
      <>
        <ModalWindow show={!!show} onHide={() => setShow(false)} size="lg">
          <IncidentWindow incident={incident} myincident={false} />
        </ModalWindow>
      </>
    );
  }, [show, incident]);

  if (!!show) {
    return jsx;
  } else return <></>;
};

export default memo(HandleSocket);
