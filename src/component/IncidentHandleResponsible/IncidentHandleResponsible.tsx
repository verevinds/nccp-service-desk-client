import React, { memo, useLayoutEffect, useState, useEffect } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IIncidentHandleResponsible } from './interface';
import { Form, Button } from 'react-bootstrap';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { usersRequestSeccessed } from '../../redux/actionCreators/usersAction';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import SetResponsibleButton from './IncidentHandleResponsibleButton';
import styles from './styles.module.css';

const IncidentHandleResponsible: React.FC<IIncidentHandleResponsible> = ({
  show,
  onHide,
  onClick,
}) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: any) => state.users, shallowEqual);
  const { incident } = useSelector(
    (state: any) => state.incidents.current,
    shallowEqual,
  );
  const [currentResponsible, setCurrentResponsible] = useState(null);
  const [currentResponsibleFullname, setCurrentResponsibleFullname] = useState(
    '',
  );
  useEffect(() => {
    let currentUser = list.find(
      (item: any) => Number(item.number) === Number(currentResponsible),
    );
    if (currentUser) {
      setCurrentResponsibleFullname(
        `${currentUser.name1} ${currentUser.name2.charAt(
          0,
        )}. ${currentUser.name3.charAt(0)}.`,
      );
    }
  }, [currentResponsible, list]);
  useLayoutEffect(() => {
    dispatch(
      queryApi({
        route: 'users',
        actionSuccessed: usersRequestSeccessed,
      }),
    );
  }, [dispatch]);
  return (
    <ModalWindow
      title={`Изменение ответственного для инцидента №${incident.id}`}
      show={show}
      onHide={onHide}
    >
      <>
        <Form.Group>
          <Form.Label>Список ответственных</Form.Label>
          <Form.Control
            as="select"
            defaultValue={currentResponsible || 0}
            onChange={(event: any) => {
              setCurrentResponsible(event.target.value);
            }}
            className={styles.select}
          >
            <option className={styles.select__option_placeholder} value={0}>
              Выберите ответственного
            </option>
            {list
              .filter(
                (item: any) =>
                  Number(item.number) !== Number(incident.currentResponsible),
              )
              .map((item: any) => (
                <option value={item.number} key={item.number}>{`${
                  item.name1
                } ${item.name2.charAt(0)}. ${item.name3.charAt(0)}.`}</option>
              ))}
          </Form.Control>
        </Form.Group>
        <SetResponsibleButton
          currentResponsible={currentResponsible}
          currentResponsibleFullname={currentResponsibleFullname}
          incident={incident}
          onClick={onClick}
          onHide={onHide}
        />
      </>
    </ModalWindow>
  );
};

export default memo(IncidentHandleResponsible);
