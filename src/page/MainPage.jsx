import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';
import Sidebar from '../component/Sidebar/Sidebar';
import { authFetching } from '../redux/actionCreators/authAction';

const MainPage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authFetching(window.ipGlobal));
  }, [dispatch]);
  useEffect(() => {
    console.log(state);
  }, [state]);

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
