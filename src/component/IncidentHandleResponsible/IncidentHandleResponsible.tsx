import React, { memo, useState, useContext, useCallback, useMemo } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { AppContext } from '../../AppContext';
import { IApi } from '../../js/api';

import { TUser, IState, TIncidentCurrent } from '../../interface';
import { nameUser } from '../../js/supportingFunction';

export interface IIncidentHandleResponsible {
  show?: boolean;
  onHide: () => void;
  currentResponsible?: number | undefined;
}
type TParams = { incidentData?: any; comment?: string };
export type IUser = {
  number: number;
};

const IncidentHandleResponsible: React.FC<IIncidentHandleResponsible> = ({ show, onHide }) => {
  const { apiDispatch } = useContext(AppContext);
  const users: TUser[] = useSelector((state: IState) => state.users.list);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { incident }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current);
  const filterList = useMemo(
    () =>
      users.filter(
        (item: TUser) =>
          item.number !== incident.currentResponsible && !item.fired && item.departmentId === user.departmentId,
      ),
    [users, incident.currentResponsible, user.departmentId],
  );
  const [responsibleId, setResponsibleId] = useState<number>(filterList[0]?.number);

  const onClick = useCallback(
    function (this: IApi) {
      if (incident) {
        this.comments(user?.number, incident.id).post({
          data: {
            text: `Заявка переведена в статус "В работе". Ответственным назначен: ${nameUser(
              users,
              responsibleId,
            )?.fullName()}`,
          },
        });
        this.incidents().put(incident?.id, {
          data: { currentResponsible: responsibleId, startWork: new Date().toISOString(), statusId: 1 },
        });
      }
    },
    [responsibleId, users, incident, user],
  );

  if (users.length > 1) {
    return (
      <ModalWindow
        title={`Изменение ответственного для заявки №${incident.id}`}
        show={show}
        onHide={onHide}
        textOk={'Сохранить'}
        onOk={() => {
          onHide();
          onClick.call(apiDispatch);
        }}
      >
        <>
          <Form.Group>
            <Form.Label>Список ответственных</Form.Label>
            <Form.Control
              as="select"
              defaultValue={filterList[0] ? filterList[0].number : 0}
              value={responsibleId}
              onChange={(event: any) => {
                setResponsibleId(event.target.value);
              }}
              className={styles.select}
            >
              {filterList.map((item: any) => (
                <option value={item.number} key={item.number}>{`${item.name1} ${item.name2.charAt(
                  0,
                )}. ${item.name3.charAt(0)}.`}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </>
      </ModalWindow>
    );
  } else {
    return <ModalWindow title={'В отделе нет других сотрудников'} onHide={onHide} show={show} />;
  }
};

export default memo(IncidentHandleResponsible);
