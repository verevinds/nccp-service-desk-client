import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/**My components */
import Incident from '../component/Incident/Incident';

const MainPage = () => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  useEffect(() => {
    if (user) {
      setParams({ departmentId: user.departmentId });
    }
  }, [user]);
  return <Incident params={params} title={'Инциденты'} />;
};

export default memo(MainPage);
