import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { incidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
/**My components */
import Incident from '../component/Incident/Incident';

const MainPage = () => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const { list } = useSelector((state) => state.incidents, shallowEqual);
  const [title, setTitle] = useState(`Инциденты`);
  useEffect(() => {
    if (user) {
      setParams({ departmentId: user.departmentId });
      if (user.department) setTitle(`${user.department?.name}`);
    }
  }, [user]);
  return (
    <Incident
      list={list}
      params={params}
      title={title}
      actionSuccessed={incidentRequestSuccessed}
    />
  );
};

export default memo(MainPage);
