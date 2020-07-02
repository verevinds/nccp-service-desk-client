import React, { memo, useContext, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { TIncident, IState, TDepartment, IUserInUsers, TUser } from '../interface';
import { IncidentWindowContext } from '../component/IncidentWindow/IncidentWindowContext';
import ModalWindow from '../component/ModalWindow/ModalWindow';

const TestPage = () => {
  const [validated, setValidated] = useState(false);
  const [chooseDepartment, setChooseDepartment] = useState('');
  const [chooseUser, setChooseUser] = useState('');
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const users: IUserInUsers[] = useSelector((state: IState) => state.users.list);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { onClick } = useContext(IncidentWindowContext);

  const matchHandle = useMemo(() => {
    return {
      method: 'post',
      data: {
        code: 3,
        incidentId: incident?.id,
        params: {
          currentResponsible: user?.number,
        },
      },
    };
  }, [incident, user]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log('NOT');
    } else {
      event.preventDefault();
      console.log('ok');
      onClick.call({
        comment: `${user.name1} ${user.name2.charAt(0)} ${user.name3.charAt(
          0,
        )} отправил(а) заявку в на согласование ${chooseUser}`,
        incidentData: { currentResponsible: chooseUser },
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
      show={true}
      onHide={() => {}}
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

export default memo(TestPage);
