import React, { memo, useState, useEffect } from 'react';
import IncidentWindow from '../IncidentWindow/IncidentWindow';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const Incident = ({ myincident = false }) => {
  const { incident } = useSelector(
    (state) => state.incidents.current,
    shallowEqual,
  );

  return (
    <Col>
      <Container>
        {incident ? (
          <IncidentWindow incident={incident} myincident={myincident} />
        ) : null}
      </Container>
    </Col>
  );
};

export default memo(Incident);
