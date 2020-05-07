import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/ru';

//ActionCreator
import { incidentFetching } from '../../redux/actionCreators/incidentAction';

import IncidentInWork from '../IncidentInWork/IncidentInWork';

import { Container, Card, Button } from 'react-bootstrap';

const Incident = ({ incident }) => {
  const dispatch = useDispatch();
  const { number } = useSelector((state) => state.auth.user);
  const onClick = () => {
    const dateNow = new Date();
    const responsible = {
      currentResponsible: number,
      startWork: `${dateNow.getFullYear()}-${
        dateNow.getMonth() + 1
      }-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
    };
    dispatch(incidentFetching('put', responsible, incident.id, 'incidents'));
  };
  useEffect(() => {
    console.log(incident);
  }, [incident]);
  if (!!incident) {
    return (
      <Container>
        <Card>
          <Card.Header>
            Инцидент №{incident.id}{' '}
            {incident.user ? (
              <IncidentInWork
                startWork={incident.startWork}
                nameResponsible={`
                ${incident.user.name1} ${incident.user.name2.charAt(
                  0,
                )}.${incident.user.name3.charAt(0)}.`}
              />
            ) : null}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {!!incident.category ? incident.category.name : null}
              {' / '}
              {!!incident.property ? incident.property.name : null}
              {' / '}
              {!!incident.option ? incident.option.name : null}
            </Card.Title>
            <Card.Text>Инициатор: {incident.name}</Card.Text>
            <Card.Text>
              {!!incident.email ? `Email: ${incident.email} ` : null}
            </Card.Text>
            <hr />
            <Card.Text>{incident.text}</Card.Text>
            {!incident.user ? (
              <Button variant="outline-success" xs="sm" onClick={onClick}>
                Взять в работу
              </Button>
            ) : (
              <Button>Сохранить</Button>
            )}
          </Card.Body>
          <Card.Footer className="text-right">
            <small>
              <i>
                <b>Создан:</b>{' '}
                <Moment locale="ru" fromNow>
                  {incident.createdAt}
                </Moment>
              </i>
              {' | '}
              <i>
                <b>Последнее обновление:</b>{' '}
                <Moment locale="ru" fromNow>
                  {incident.updatedAt}
                </Moment>
              </i>
            </small>
          </Card.Footer>
        </Card>
      </Container>
    );
  } else {
    return <h2>Выберите инцидент</h2>;
  }
};

export default memo(Incident);
