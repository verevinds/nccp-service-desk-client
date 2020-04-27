import React, { memo, useEffect } from 'react';

/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';
import Sidebar from '../component/Sidebar/Sidebar';
import { authFetching } from '../redux/actionCreators/authAction';

const MainPage = () => {
  return (
    <Row className="mt-3">
      <Col xs={3}>
        <Sidebar />
      </Col>
      <Col>
        <Incident />
      </Col>
    </Row>
  );
};

export default memo(MainPage);
