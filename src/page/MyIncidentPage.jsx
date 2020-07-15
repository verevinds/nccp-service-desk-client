import React, { memo, useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { myIncidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
import { incidentChoose } from '../redux/actionCreators/incidentAction';

/**My components */
import Incident from '../component/Incident/Incident';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowMyButton from '../component/IncidentWindowMyButton/IncidentWindowMyButton';

const MyIncidentPage = (props) => {
  const [params, setParams] = useState();
  const user = useSelector((state) => state.auth.user);
  const { incidents } = useSelector((state) => state);
  const myList = useSelector((state) => state.incidents.myList);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(incidentChoose(undefined));
  }, [dispatch]);

  useLayoutEffect(() => {
    let id = props.match.params.id;
    let incident = myList.find((item) => item.id === Number(id));
    console.log(props.match);
    dispatch(incidentChoose(incident));
  }, [myList, dispatch, props.match]);

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
      <IncidentContext.Provider
        value={{
          params,
          actionSuccessed: myIncidentRequestSuccessed,
          myIncident: true,
          Buttons: IncidentWindowMyButton,
          match: { path: '/myincidents' },
        }}
      >
        <h1>Мои заявки</h1>
        <Incident />
      </IncidentContext.Provider>
    );
  } else {
    return <p>Загрузка данных</p>;
  }
};

export default memo(MyIncidentPage);
