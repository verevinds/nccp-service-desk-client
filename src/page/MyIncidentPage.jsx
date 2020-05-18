import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/**My components */
import Incident from '../component/Incident/Incident';

const MyIncidentPage = (props) => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  useEffect(() => {
    if (user) {
      setParams({
        userNumber: user.number,
        // departmentId: user.departmentId,
      });
    }
  }, [user]);
  return <Incident params={params} badge={true} />;
};

export default memo(MyIncidentPage);
