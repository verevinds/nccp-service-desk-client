import React, { memo } from 'react';
import { Container, Card, Accordion, Button } from 'react-bootstrap';

const InfoPage = () => {
  return (
    <Container fluid>
      <h1>Документация (версия {`${process.env.REACT_APP_VERSION}`})</h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Версия 1.0.1
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Версия 1.0.1
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Альфа-тест</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default memo(InfoPage);
