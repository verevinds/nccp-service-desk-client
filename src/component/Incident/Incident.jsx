import React, { memo, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const Incident = (props) => {
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

  return (
    <Container>
      <Card>
        <Card.Header>№210324 - Замена картриджа</Card.Header>
        <Card.Body>
          <Card.Title>Замента картриджа в кабинете № 504</Card.Title>
          <Card.Text>Закончилась краска в картиридже. Нужна заменя.</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              setStatus(setStatus({ ...status, code: status.code++ }));
            }}
          >
            {status.textButton}
          </Button>
        </Card.Body>
        <Card.Footer className="text-right">Создан : 2 дня назад</Card.Footer>
      </Card>
    </Container>
  );
};

export default memo(Incident);
