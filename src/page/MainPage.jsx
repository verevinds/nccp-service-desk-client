import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Button } from 'react-bootstrap';
/**My components */
import Incident from '../component/Incident/Incident';

const MainPage = () => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [title, setTitle] = useState(`Инциденты`);
  useEffect(() => {
    if (user) {
      setParams({ departmentId: user.departmentId });
      setTitle(`${user.department.name}`);
    }
  }, [user]);
  return <Incident params={params} title={title} />;
};

export default memo(MainPage);
