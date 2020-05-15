import React, { memo } from 'react';

/**My components */
import Incident from '../component/Incident/Incident';

const MyIncidentPage = (props) => {
  return <Incident myincident={true} />;
};

export default memo(MyIncidentPage);
