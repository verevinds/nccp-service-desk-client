import React, { memo, useState, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { incidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
/**My components */
import Incident from '../component/Incident/Incident';
import { IncidentContext } from '../component/Incident/IncidentContext';

const MainPage = () => {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [params, setParams] = useState();
  const [title, setTitle] = useState(`Инциденты`);

  useEffect(() => {
    if (user) {
      setParams({ departmentId: user.departmentId });
      if (user.department) setTitle(`${user.department?.name}`);
    }
  }, [user]);

  // list.sort((a, b) => (Number(a.updatedAt) > Number(b.updatedAt) ? 1 : -1))
  const incident = useMemo(() => {
    return {
      params,
      title,
      requestSuccessed: incidentRequestSuccessed,
    };
  }, [params, title]);

  return (
    <IncidentContext.Provider value={incident}>
      <Incident />
    </IncidentContext.Provider>
  );
};

export default memo(MainPage);
