import React, { memo, Fragment, useLayoutEffect } from 'react';
import { incidentChoose } from '../redux/actionCreators/incidentAction';
import { useDispatch, useSelector } from 'react-redux';
import { TIncident, IState } from '../interface';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowVisaButton from '../component/IncidentWindowVisaButton/IncidentWindowVisaButton';
import Incident from '../component/Incident/Incident';

const VisaPage = () => {
  const dispatch = useDispatch();
  const incidents: TIncident[] = useSelector((state: IState) => state.incidents.visa);

  useLayoutEffect(() => {
    dispatch(incidentChoose(undefined));
  }, [dispatch]);

  return (
    <Fragment>
      <IncidentContext.Provider
        value={{
          title: 'Требуют моего согласования',
          incidents,
          Buttons: IncidentWindowVisaButton,
          match: { path: '/visa' },
        }}
      >
        <Incident />
      </IncidentContext.Provider>
    </Fragment>
  );
};

export default memo(VisaPage);
