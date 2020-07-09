import React, { memo, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import IncidentWindowButton from '../component/IncidentWindowButton/IncidentWindowButton';
import { incidentChoose } from '../redux/actionCreators/incidentAction';

import { incidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
/**My components */
import Incident from '../component/Incident/Incident';
import { IncidentContext } from '../component/Incident/IncidentContext';

const MainPage = () => {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [params, setParams] = useState();
  const [title, setTitle] = useState(`Инциденты`);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(incidentChoose(undefined));
  }, []);
  useEffect(() => {
    if (user) {
      let isDepartment = !!user.department;

      setParams({ departmentId: user.departmentId });

      if (isDepartment) setTitle(`${user.department?.name}`);
    }
  }, [user]);

  // list.sort((a, b) => (Number(a.updatedAt) > Number(b.updatedAt) ? 1 : -1))
  const incident = useMemo(() => {
    return {
      params,
      title,
      requestSuccessed: incidentRequestSuccessed,
      Buttons: IncidentWindowButton,
    };
  }, [params, title]);

  return (
    <IncidentContext.Provider value={incident}>
      <h1>Рабочая панель</h1>
      <Incident />
    </IncidentContext.Provider>
  );
};

export default memo(MainPage);
