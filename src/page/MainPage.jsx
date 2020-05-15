import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

/**My components */
import Incident from '../component/Incident/Incident';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const MainPage = () => {
  return <Incident />;
};

export default memo(MainPage);
