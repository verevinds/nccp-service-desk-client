import React, { memo, Fragment } from 'react';
import { Container } from 'react-bootstrap';
export interface IVisePage {}

const VisePage: React.FC<IVisePage> = (props) => {
  return (
    <Fragment>
      <Container fluid>
        <h1>Требует согласования</h1>
      </Container>
    </Fragment>
  );
};

export default memo(VisePage);
