import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { myIncidentRequestSuccessed } from '../redux/actionCreators/incidentAction';

/**My components */
import Incident from '../component/Incident/Incident';
import { IncidentContext } from '../component/Incident/IncidentContext';

const MyIncidentPage = (props) => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const { incidents } = useSelector((state) => state, shallowEqual);

  useEffect(() => {
    if (user) {
      setParams({
        userNumber: user.number,
        // departmentId: user.departmentId,
      });
    }
  }, [user]);
  if (incidents) {
    return (
      <IncidentContext.Provider value={{ params, actionSuccessed: myIncidentRequestSuccessed, myIncident: true }}>
        <Incident />
      </IncidentContext.Provider>
    );
  } else {
    return <p>Загрузка данных</p>;
  }
};

export default memo(MyIncidentPage);
