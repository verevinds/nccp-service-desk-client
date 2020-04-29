import React, { memo, useEffect } from 'react';

/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';
import Sidebar from '../component/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const incidents = useSelector((state) => state.incidents);
  useEffect(() => {
    console.log(incidents);
  }, [incidents]);

  return (
    <Row className="mt-3">
      <Col xs={3}>
        <Sidebar list={incidents.list} isLoading={incidents.isLoading} />
      </Col>
      <Col>
        <Incident />
      </Col>
    </Row>
  );
};

export default memo(MainPage);
