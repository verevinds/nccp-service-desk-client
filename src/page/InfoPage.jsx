import React, { memo } from 'react';
import Info from '../component/Info/Info';
import { Container } from 'react-bootstrap';

const InfoPage = () => {
  return (
    <Container fluid>
      <h1>Что нового </h1>
      <hr />
      <Info />
    </Container>
  );
};

export default memo(InfoPage);
