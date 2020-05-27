import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Col, Row, Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import {
  usersCurrentRequestSeccessed,
  usersCurrentUpdate,
} from '../../redux/actionCreators/usersAction';

interface ISettingAccessCard {
  id?: number;
}
const SettingAccessCard: React.FC<ISettingAccessCard> = ({ id }) => {
  const { user, isUpdate } = useSelector((state: any) => state.users.current);
  const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    dispatch(
      queryApi({
        route: 'users',
        actionSuccessed: usersCurrentRequestSeccessed,
        params: { number: id },
      }),
    );
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (id) fetchUser();
  }, [id, fetchUser]);

  useEffect(() => {
    if (isUpdate) fetchUser();
  }, [isUpdate, fetchUser]);

  const provideAccess = useCallback(
    (method) => {
      let data = { access: 1, userNumber: user?.number };
      dispatch(
        queryApi({
          route: 'access',
          method,
          actionUpdate: usersCurrentUpdate,
          data,
          id: method === 'delete' ? user?.number : undefined,
        }),
      );
    },
    [user, dispatch],
  );

  if (user) {
    return (
      <Card>
        <Card.Header>
          <Card.Text as="h3">
            {`${user.name1} ${user.name2} ${user.name3} `}{' '}
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Row>
            <Col xs={5} md={4}>
              <Image src={user.photo} thumbnail />
            </Col>
            <Col xs={6}>
              <Row>
                <b>Дата рождения:</b>
              </Row>
              <Row> {user.dob}</Row>

              <Row>
                <b>Email:</b>
              </Row>
              <Row> {user.email}</Row>

              <Row>
                <b>Телефон №1:</b>
              </Row>
              <Row> {user.phone1}</Row>

              <Row>
                <b>Телефон №2:</b>
              </Row>
              <Row> {user.phone2}</Row>

              <Row>
                <b>Отдел:</b>
              </Row>
              <Row>{user.department.name}</Row>

              <Row>
                <b>Должность:</b>
              </Row>
              <Row> {user.position.name}</Row>
            </Col>
          </Row>
          <hr />
          {user.accesses.length ? (
            <Button
              variant="outline-danger"
              onClick={provideAccess.bind(null, 'delete')}
            >
              Убрать доступ
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              onClick={provideAccess.bind(null, 'post')}
            >
              Предоставить доступ
            </Button>
          )}
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <div>
            <small className="text-muted">
              <b>Доступ к настройкам Service Desk:</b>{' '}
              {user.accesses.length ? 'Имеется' : 'Отсутствует'}
            </small>
          </div>

          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    );
  } else {
    return <p>Нет данных</p>;
  }
};

export default memo(SettingAccessCard);
