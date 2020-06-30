import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast, ToastOptions } from 'react-toastify';

import openSocket from 'socket.io-client';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';
import { IState, TUser, TIncident } from '../../interface';

const socket = openSocket(`${window.location.protocol}//srv-sdesk.c31.nccp.ru:8000`);

const HandleSocket = () => {
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState<TIncident | undefined>();

  const body = useCallback((text: string, buttonText: string, type: string) => {
    const icon = [
      { emoji: '✅', type: 'success' },
      { emoji: '️📰', type: 'info' },
      { emoji: '⚠️', type: 'warn' },
    ];
    let iconSpan = icon.find((item) => item.type === type);
    if (!iconSpan) iconSpan = { emoji: '✉️', type: 'default' };

    return (
      <div className={'alertCustom'}>
        <div className={'alertCustom__title'}>
          <span role="img" aria-label={iconSpan?.type}>
            {iconSpan?.emoji}
          </span>
          <div className={'alertCustom__body'}>
            <h6>{text}</h6>
            <div className={'alertCustom__button'}>{buttonText}</div>
          </div>
        </div>
      </div>
    );
  }, []);

  useEffect(() => {
    if (user) {
      console.log('init alert');
      socket.on(`updateResponsible${user?.number}`, (data: TIncident) => {
        console.log(`updateResponsible${user?.number}`, data);
        dispatch(incidentCreate());
        setMessage(data);
      });
      socket.on(`updateIncidentOwner${user?.number}`, (data: TIncident) => {
        console.log(`updateIncidentOwner${user?.number}`, data);
        dispatch(incidentCreate());
        setMessage(data);
      });
      socket.on(`updateResponsibleDepartment${user?.departmentId}`, (data: TIncident) => {
        console.log(`updateResponsibleDepartment${user?.departmentId}`, data);
        dispatch(incidentCreate());
        setMessage(data);
      });
    }
  }, [user, setMessage]);

  useEffect(() => {
    console.log('message', message);
    if (message) {
      toast.info(body(`Получено обновление по заявке №${message.id}`, '', 'info'));
    }
  }, [message]);

  return <></>;
};

export default memo(HandleSocket);
