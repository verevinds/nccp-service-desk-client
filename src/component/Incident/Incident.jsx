import React, { memo, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import Moment from 'react-moment';
import 'moment/locale/ru';

const Incident = ({ incident }) => {
  const [status, setStatus] = useState({
    code: 0,
    textButton: 'Взять в работу',
  });

  useEffect(() => {
    switch (status.code) {
      case 0:
        setStatus({ ...status, textButton: 'Взять в работу' });
        break;
      case 1:
        setStatus({ ...status, textButton: 'Выполнен' });
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [status.code]);
  if (!!incident) {
    return (
      <Container>
        <Card>
          <Card.Header>
            Инцидент №{incident.id} |<b>{` принят в работу `}</b>
            <Moment locale="ru" fromNow>
              {incident.startWork}
            </Moment>
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
            <Button>Сохранить</Button>
          </Card.Body>
          <Card.Footer className="text-right">
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
          </Card.Footer>
        </Card>
      </Container>
    );
  } else {
    return <h2>Выберите инцидент</h2>;
  }
};

export default memo(Incident);
