import React, { memo, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { myIncidentRequestSuccessed } from '../redux/actionCreators/incidentAction';

/**My components */
import Incident from '../component/Incident/Incident';

const MyIncidentPage = (props) => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const { myList } = useSelector((state) => state.incidents, shallowEqual);

  useEffect(() => {
    if (user) {
      setParams({
        userNumber: user.number,
        // departmentId: user.departmentId,
      });
    }
  }, [user]);
  if (myList) {
    return (
      <Incident
        list={myList}
        params={params}
        badge={true}
        actionSuccessed={myIncidentRequestSuccessed}
      />
    );
  } else {
    return <p>Загрузка данных</p>;
  }
};

export default memo(MyIncidentPage);
