import React, { memo, useEffect, useContext, useState, useMemo, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { AlertContext } from '../Alert/AlertContext';
// import SpeechOn from '../../sounds/SpeechOn.mp3';
import { Button } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import openSocket from 'socket.io-client';
import { incidentCreate, incidentChoose } from '../../redux/actionCreators/incidentAction';
import ModalWindow from '../ModalWindow/ModalWindow';
import IncidentWindow from '../IncidentWindow/IncidentWindow';

const socket = openSocket('http://srv-sdesk.c31.nccp.ru:8000');
type ISocketIncident = {
  id: number | null;
  startWork: string | null;
  currentResponsible: number | null;
  text: string | null;
  level: number | null;
  statusId: number | null;
  departmentId: number | null;
  userNumber: number | null;
  categoryId: number | null;
  propertyId: number | null;
  optionId: number | null;
  consent: number | null;
  updatedAt: string | null;
  createdAt: string | null;
  positionId: number | null;
  isArchive: boolean;
};

type TUser = {
  accesses: any[];
  computer: string;
  createdAt: string;
  department: { id: number; name: string; createdAt: string; updatedAt: string };
  departmentId: number | null;
  dob: string;
  email: string;
  exmail: string;
  fired: number;
  login: string | null;
  name1: string;
  name2: string;
  name3: string;
  number: number;
  phone1: string;
  phone2: string;
  photo: string;
  position: { id: number; name: string; level: number; createdAt: string; updatedAt: string };
  positionId: number | null;
  sex: number;
  updatedAt: string;
};

const HandleSocket = () => {
  const setAlert = useContext(AlertContext);
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const users = useSelector((state: any) => state.users.list, shallowEqual);
  const { list } = useSelector((state: any) => state.incidents, shallowEqual);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState<ISocketIncident | undefined>();
  const { incident, isChange } = useSelector((state: any) => state.incidents.current, shallowEqual);

  const newAlert = useCallback(
    (data: ISocketIncident) => {
      setAlert({
        type: 'info',
        text: <>Поступил новый инцидент №{data.id}</>,
        button: (
          <>
            <Button
              size="sm"
              variant="outline-info"
              onClick={() => {
                setShow(!show);
                setData(data);
              }}
            >
              <span>Посмотреть </span>
              <FontAwesomeIcon icon={faEye} size="lg" />
            </Button>
          </>
        ),
      });
    },
    [setAlert, show],
  );

  useEffect(() => {
    dispatch(incidentCreate());
    socket.on(String(user?.departmentId), setData);
  }, [user, dispatch, setAlert, show, data]);
  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    if (data) {
      let user: TUser = users.find((item: TUser) => item.number === data.userNumber);
      switch (Notification.permission.toLowerCase()) {
        case 'granted':
          new Notification(`${user.name1} ${user.name2} ${user.name3}`, {
            tag: !!data ? String(data.id) : undefined,
            body: `Направил Вам новый инцидент №${!!data ? data.id : ''}`,
            icon: user.photo,
          });
          break;

        case 'denied':
          newAlert(data);
          break;

        case 'default':
        // спросить
      }
    }
  }, [data, users, newAlert]);
  useEffect(() => {
    if ((!!data && !!data.id) || isChange || !incident) {
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
