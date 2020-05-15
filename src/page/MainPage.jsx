import React, { memo, useState, useEffect } from 'react';

/**My components */
import Incident from '../component/Incident/Incident';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const MainPage = () => {
  return <Incident />;
};

export default memo(MainPage);
