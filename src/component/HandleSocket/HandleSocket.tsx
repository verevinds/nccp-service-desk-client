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
import {
  IUserInUsers,
  IState,
  TUser,
  TIncidentCurrent,
  TIncident,
  TCategory,
  TProperty,
  TOption,
  TIncidents,
} from '../../interface';

const socket = openSocket('https://srv-sdesk.c31.nccp.ru:8000');

const HandleSocket = () => {
  const setAlert = useContext(AlertContext);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const users: IUserInUsers[] = useSelector((state: IState) => state.users.list, shallowEqual);
  const catalog: TCategory[] | never[] = useSelector((state: IState) => state.catalog.list, shallowEqual);
  const { list, isUpdate }: TIncidents = useSelector((state: IState) => state.incidents);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState<TIncident | undefined>();
  const { incident }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current, shallowEqual);

  useEffect(() => {
    // console.log('ТЕКУЩИЙ', incident);
  }, [incident]);
  useEffect(() => {
    if (show) {
      let incident = list.find((item: TIncident) => item.id === data?.id);
      dispatch(incidentChoose(incident));
      // console.log('Incident isUpdate');
    }
  }, [isUpdate, list, data, dispatch, show]);
  const newAlert = useCallback(
    (data: TIncident) => {
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
    socket.on(String(user?.departmentId), (data: TIncident) => {
      dispatch(incidentCreate());
      setData(data);
    });
  }, [user, dispatch]);

  useEffect(() => {
    if (data) {
      let user: IUserInUsers | undefined = users.find((item: IUserInUsers) => item.number === data.userNumber);
      let category: TCategory | undefined = catalog.find((item: TCategory) => item.id === data.categoryId);
      let property: TProperty | undefined =
        category && category?.properties.find((item: TProperty) => item.id === data.propertyId);
      let option: TOption | undefined =
        category && category?.options.find((item: TOption) => item.id === data.optionId);
      let body =
        'Направил Вам новый инцидент №' +
        `${!!data ? data.id : ''}` +
        '\n\n' +
        `Тип: ${category?.name} ${property?.name} ${option?.name} `;
      if (user) {
        switch (Notification.permission.toLowerCase()) {
          case 'granted':
            let notify = new Notification(`${user.name1} ${user.name2} ${user.name3}`, {
              tag: !!data ? String(data.id) : undefined,
              body,
              icon: user.photo,
            });
            notify.onclick = (event: any) => {
              let incident = list.find((item: TIncident) => item.id === data?.id);
              dispatch(incidentChoose(incident));
              setShow(true);
            };
            break;

          case 'denied':
            newAlert(data);
            break;

          case 'default':
          // спросить
        }
      }
    }
  }, [data, users, newAlert, catalog, list, show, dispatch, isUpdate]);

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
