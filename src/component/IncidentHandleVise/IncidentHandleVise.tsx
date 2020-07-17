import React, { memo, useContext, useState, useMemo } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { useSelector } from 'react-redux';
import { TDepartment, IState, TUser, TIncident } from '../../interface';
import { Form } from 'react-bootstrap';
import { useCallback } from 'react';
import { AppContext } from '../../AppContext';
import { nameUser } from '../../js/supportingFunction';
import { IApi } from '../../js/api';

const IncidentHandleVise = () => {
  const { handleVise } = useContext(IncidentWindowContext);
  const [validated, setValidated] = useState(false);
  const [chooseDepartment, setChooseDepartment] = useState('');
  const [chooseUser, setChooseUser] = useState('');
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const users: TUser[] = useSelector((state: IState) => state.users.list);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { apiDispatch } = useContext(AppContext);

  const matchHandle = useMemo(() => {
    return {
      data: {
        code: 3,
        incidentId: incident?.id,
        params: {
          currentResponsible: user?.number,
          departmentId: user?.departmentId,
        },
      },
    };
  }, [incident, user]);

  const onClick = useCallback(
    function (this: IApi) {
      const text = `Заявка отправлена на согласование к сотруднику: ` + nameUser(user)?.initials();

      this.comments(user.number, incident.id).post({ data: { text } });
      this.incidents().put(incident.id, {
        data: { currentResponsible: chooseUser, statusId: 8388606, departmentId: chooseDepartment },
      });
      this.matches().post(matchHandle);
    },
    [matchHandle, chooseDepartment, chooseUser, user, incident],
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      onClick.call(apiDispatch);
    }

    setValidated(true);
  };

  const usersSelecter = useMemo(() => {
    if (chooseDepartment)
      return users.filter((item: TUser) => item.departmentId === Number(chooseDepartment) && item.fired === 0);
  }, [chooseDepartment, users]);

  return (
    <ModalWindow
      show={handleVise?.vise}
      onHide={() => handleVise?.setVise(false)}
      title={'Создание заявки'}
      onSubmit={onSubmit}
      textOk={'Отправить'}
      textNot={'Отменить'}
      validated={validated}
    >
      <>
        <Form.Group controlId="form.Select1">
          <Form.Control
            as="select"
            required={true}
            value={chooseDepartment}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setChooseDepartment(event.currentTarget.value);
            }}
          >
            <option value="">Выберите отдел</option>
            {department?.map((item: TDepartment, index: number) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <br />
        {!!usersSelecter ? (
          <Form.Group controlId="form.Select2">
            <Form.Control
              as="select"
              required={true}
              value={chooseUser}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setChooseUser(event.currentTarget.value);
              }}
            >
              <option value="">Выберите сотрудника</option>
              {usersSelecter.map((item: TUser, index: number) => (
                <option value={item.number} key={index}>
                  {item.name1} {item.name2} {item.name3}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : undefined}
      </>
    </ModalWindow>
  );
};

export default memo(IncidentHandleVise);
