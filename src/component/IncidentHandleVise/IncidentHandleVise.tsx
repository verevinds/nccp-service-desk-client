import React, { memo, useContext, useState, useMemo, useRef } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { useSelector } from 'react-redux';
import { TPropertyParam, TDepartment, IState, IUserInUsers, TUser, TIncident } from '../../interface';
import { Form, Modal, Button, Col, Row } from 'react-bootstrap';
interface IIncidentHandleVise {}
const IncidentHandleVise: React.FC<IIncidentHandleVise> = () => {
  const { handleVise } = useContext(IncidentWindowContext);
  const [validated, setValidated] = useState(false);
  const [chooseDepartment, setChooseDepartment] = useState('');
  const [chooseUser, setChooseUser] = useState('');
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const users: IUserInUsers[] = useSelector((state: IState) => state.users.list);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { onClick } = useContext(IncidentWindowContext);

  const visePerson = useMemo(() => {
    return users.find((item: TUser) => item.number === Number(chooseUser));
  }, [chooseUser]);

  let input: TPropertyParam = {
    title: '',
    description: '',
    parent: '',
    placeholder: '',
    required: true,
    select: 'users',
    type: 'list',
    value: '',
  };

  const matchHandle = useMemo(() => {
    return {
      method: 'post',
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      onClick.call({
        comment:
          `${user.name1} ${user.name2.charAt(0)} ${user.name3.charAt(0)} отправил(а) заявку на визирование` +
          ` ${visePerson?.name1} ${user.name2.charAt(0)} ${user.name3.charAt(0)}`,
        incidentData: { currentResponsible: chooseUser, statusId: 8388606, departmentId: chooseDepartment },
        matchHandle,
      });
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
