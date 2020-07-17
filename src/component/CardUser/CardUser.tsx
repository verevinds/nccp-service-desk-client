import React, { memo, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Image, Col, Row, Container } from 'react-bootstrap';
import styles from './styles.module.css';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { usersCurrentRequestSeccessed } from '../../redux/actionCreators/usersAction';
import { TUsers, IState } from '../../interface';
import CardUserButton from '../CardUserButton/CardUserButton';
import { nameUser } from '../../js/supportingFunction';

interface ICardUser {
  id?: number;
  isPopover?: boolean;
}
const CardUser: React.FC<ICardUser> = ({ id, isPopover }) => {
  const {
    current: { user, isUpdate },
  }: TUsers = useSelector((state: IState) => state.users);
  const isAccess = useSelector((state: IState) => state.access.isAccess);
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

  const img = useMemo(() => {
    if (user) {
      return <Image src={user.photo} thumbnail />;
    }
  }, [user]);
  const text = useCallback((title: string, content: any) => {
    return (
      <>
        <b>{title}</b>
        {content}
        <br />
      </>
    );
  }, []);

  if (user) {
    if (!isPopover)
      return (
        <Card>
          <Card.Header>
            <Card.Text as="h3">{nameUser(user)?.fullName()} </Card.Text>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={5} md={4}>
                {img}
              </Col>
              <Col xs={6}>
                {text(`Дата рождения: `, user.dob)}
                {text(`Email: `, user.email)}
                {text(`Телефон №1: `, user.phone1)}
                {text(`Телефон №2: `, user.phone2)}
                {text(`Отдел: `, user.department.name)}
                {text(`Должность: `, user.position.name)}
              </Col>
            </Row>
            {isAccess ? <CardUserButton /> : undefined}
          </Card.Body>
          <Card.Footer className={styles.footer}>
            <div>
              <small className="text-muted">
                <b>Доступ к настройкам Service Desk:</b> {user.accesses.length ? 'Имеется' : 'Отсутствует'}
              </small>
            </div>

            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      );
    else
      return (
        <Container>
          <h6>{nameUser(user)?.fullName()} </h6>
          {img}
          <hr />
          {text(`Email: `, user.email)}
          {text(`Телефон №1: `, user.phone1)}
          {text(`Телефон №2: `, user.phone2)}
        </Container>
      );
  } else {
    return <p>Нет данных</p>;
  }
};

export default memo(CardUser);
