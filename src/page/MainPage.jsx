import React, { memo } from 'react';

/**Bootstrap components */
import { Container, Badge, Row, Col, ListGroup } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';

const MainPage = () => {
  return (
    <Row className="mt-3">
      <Col xs={3}>
        <Container>
          <h3>
            Инциденты
            <Badge variant="primary" className="ml-3">
              {1}
            </Badge>
          </h3>
          <ListGroup variant="flush">
            <ListGroup.Item variant="primary">
              №210324 - Замена картриджа
            </ListGroup.Item>
            <ListGroup.Item>№210543 - Замена принтера</ListGroup.Item>
            <ListGroup.Item>№210234 - Ремонт принтера</ListGroup.Item>
            <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          </ListGroup>
        </Container>
      </Col>
      <Col>
        <Incident />
      </Col>
    </Row>
  );
};

export default memo(MainPage);
