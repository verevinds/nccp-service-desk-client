import React, { memo } from 'react';

//?Bootstrap
import { Row, Col, Container } from 'react-bootstrap';

const AdminPage = (props) => {
  return (
    <div>
      <h1>Admin</h1>
      <Row>
        <Col>
          <Container>1</Container>
        </Col>
        <Col>
          <Container>2</Container>
        </Col>
        <Col>
          <Container>3</Container>
        </Col>
      </Row>
    </div>
  );
};

export default memo(AdminPage);
