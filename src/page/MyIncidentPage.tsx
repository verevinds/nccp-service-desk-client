import React, { memo, useLayoutEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/** Typescript interface & type */
import { TPropsParams, IState, TAuth } from '../interface';
/**My components */
import Incident from '../component/Incident/Incident';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowMyButton from '../component/IncidentWindowMyButton/IncidentWindowMyButton';
/** Action creators */
import { myIncidentRequestSuccessed } from '../redux/actionCreators/incidentAction';
import { incidentChoose } from '../redux/actionCreators/incidentAction';
import { findById } from '../js/supportingFunction';

const MyIncidentPage = (props: TPropsParams) => {
  const { user }: TAuth = useSelector((state: IState) => state.auth);
  const incidents = useSelector((state: IState) => state.incidents.myList);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let id = props.match.params.id;
    let incident = findById(incidents, id);

    dispatch(incidentChoose(incident));
    // eslint-disable-next-line
  }, [incidents, dispatch]);

  const params = useMemo(() => ({ userNumber: user?.number }), [user]);

  return (
    <IncidentContext.Provider
      value={{
        title: 'Мои заявки',
        params,
        actionSuccessed: myIncidentRequestSuccessed,
        isMyIncidentsPage: true,
        Buttons: IncidentWindowMyButton,
        match: { path: '/myincidents' },
        incidents,
      }}
    >
      <Incident />
    </IncidentContext.Provider>
  );
};

export default memo(MyIncidentPage);
