import React, { memo, useLayoutEffect, useState, useEffect, useContext, useCallback } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Form } from 'react-bootstrap';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { usersRequestSeccessed } from '../../redux/actionCreators/usersAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';
import { AppContext } from '../../AppContext';
import { IApi } from '../../js/api';
import { useMemo } from 'react';
import { TUser, IState, TIncidentCurrent } from '../../interface';

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
  const dispatch = useDispatch();
  const { apiDispatch } = useContext(AppContext);

  const users = useSelector((state: IState) => state.users.list);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const { incident }: TIncidentCurrent = useSelector((state: IState) => state.incidents.current);

  const [filterList, setFilterList] = useState<IUser[]>([]);

  useLayoutEffect(() => {
    if (!!users) {
      setFilterList(
        users.filter(
          (item: TUser) =>
            Number(item.number) !== Number(incident.currentResponsible) &&
            !item.fired &&
            item.departmentId === user.departmentId,
        ),
      );
    }
  }, [users, incident.currentResponsible, user.departmentId]);
  const [currentResponsible, setCurrentResponsible] = useState<number>();
  useLayoutEffect(() => {
    if (filterList[0]) {
      setCurrentResponsible(filterList[0].number);
    }
  }, [filterList]);
  const [currentResponsibleFullname, setCurrentResponsibleFullname] = useState('');
  useEffect(() => {
    let currentUser = users.find((item: any) => Number(item.number) === Number(currentResponsible));
    if (currentUser) {
      setCurrentResponsibleFullname(
        `${currentUser.name1} ${currentUser.name2.charAt(0)}. ${currentUser.name3.charAt(0)}.`,
      );
    }
    if (!!users.length) {
      if (!!users.number) {
        setCurrentResponsible(
          users.filter((item: any) => Number(item.number) !== Number(incident.currentResponsible))[0].number,
        );
      }
    }
  }, [currentResponsible, users, incident.currentResponsible]);

  const onClick = useCallback(
    function (this: IApi) {
      if (incident) {
        this.comments().post({
          data: {
            incidentId: incident.id,
            text: `Заявка переведена в статус "В работе". Ответственным назначен: ${currentResponsibleFullname}`,
          },
        });
        this.incidents().put(incident?.id, {
          data: { currentResponsible, startWork: new Date().toISOString(), statusId: 1 },
        });
      }
      // this.comments();
      // this.incidents({ data: { currentResponsible, startWork: new Date().toISOString(), statusId: 1 } });
    },
    [currentResponsible, currentResponsibleFullname, incident],
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
          // !!Api && onClick.call(Api);
          onClick.call(apiDispatch);
        }}
      >
        <>
          <Form.Group>
            <Form.Label>Список ответственных</Form.Label>
            <Form.Control
              as="select"
              defaultValue={filterList[0] ? filterList[0].number : 0}
              onChange={(event: any) => {
                setCurrentResponsible(event.target.value);
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
