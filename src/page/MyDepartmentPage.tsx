import React, { memo, Fragment, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IState, TIncident } from '../interface';
import { incidentChoose } from '../redux/actionCreators/incidentAction';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowDepartmentButton from '../component/IncidentWindowDepartmentButton/IncidentWindowDepartmentButton';
import Incident from '../component/Incident/Incident';
import { findById } from '../js/supportingFunction';
export interface IMyDepartmentPage {}

const MyDepartmentPage: React.FC<any> = (props) => {
  const incidents: TIncident[] = useSelector((state: IState) => state.incidents.allowToCreate);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let id = props.match.params.id;
    let incident = findById(incidents, id);

    dispatch(incidentChoose(incident));
    // eslint-disable-next-line
  }, [incidents, dispatch]);

  return (
    <Fragment>
      <IncidentContext.Provider
        value={{ incidents, Buttons: IncidentWindowDepartmentButton, match: { path: '/MyDepartmentPage' } }}
      >
        <h1>Мой отдел</h1>
        <Incident />
        {
          // <Row className="mt-1">
          //         <Col xs={5}>
          //           <WrapperSidebar
          //             list={incidents}
          //             activeId={chooseIncidentId}
          //             onClick={(id) => {
          //               setChooseIncidentId(id);
          //             }}
          //             title={'Требует согласования'}
          //           />
          //         </Col>
          //         <Col>
          //           <Container>
          //             <IncidentWindow />
          //           </Container>
          //         </Col>
          //       </Row>
        }
      </IncidentContext.Provider>
    </Fragment>
  );
};

export default memo(MyDepartmentPage);
