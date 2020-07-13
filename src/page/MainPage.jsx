import React, { memo, useState, useEffect, useMemo, useLayoutEffect, Suspense } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import IncidentWindowButton from '../component/IncidentWindowButton/IncidentWindowButton';
import { incidentChoose } from '../redux/actionCreators/incidentAction';

import { incidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
/**My components */
import { IncidentContext } from '../component/Incident/IncidentContext';
import SpinnerGrow from '../component/SpinnerGrow/SpinnerGrow';
const Incident = React.lazy(() => import('../component/Incident/Incident'));

const MainPage = (props) => {
  const user = useSelector((state) => state.auth.user);
  const list = useSelector((state) => state.incidents.list);
  const [params, setParams] = useState();
  const [title, setTitle] = useState(`Инциденты`);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let id = props.match.params.id;
    let incident = list.find((item) => item.id === Number(id));
    console.log(props.match);
    dispatch(incidentChoose(incident));
  }, [list]);
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
      match: { path: '/incident' },
    };
  }, [params, title]);

  return (
    <IncidentContext.Provider value={incident}>
      <h1>Рабочая панель</h1>
      <Suspense fallback={<SpinnerGrow />}>
        <Incident />
      </Suspense>
    </IncidentContext.Provider>
  );
};

export default memo(MainPage);
