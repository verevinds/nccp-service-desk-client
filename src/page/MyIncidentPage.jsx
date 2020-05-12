import React, { memo, useEffect, useState } from 'react';
import Incident from '../component/Incident/Incident';
import { useSelector } from 'react-redux';

const MyIncidentPage = (props) => {
  const {
    incidents: { myList },
  } = useSelector((state) => state);

  return <Incident list={myList} myincident={true} />;
};

export default memo(MyIncidentPage);
