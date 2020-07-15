import React, { memo, Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { IState, TIncident } from '../interface';
import { incidentChoose } from '../redux/actionCreators/incidentAction';
import WrapperSidebar from '../component/Sidebar/WrapperSidebar';
import { TList } from '../component/Sidebar/interface';
import IncidentWindow from '../component/IncidentWindow/IncidentWindow';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowDepartmentButton from '../component/IncidentWindowDepartmentButton/IncidentWindowDepartmentButton';
export interface IMyDepartmentPage {}

const MyDepartmentPage: React.FC<any> = (props) => {
  const [chooseIncidentId, setChooseIncidentId] = useState<number | undefined>();
  const [sidebarList, setSidebarList] = useState<(TList | never)[]>([]);
  const incidents: TIncident[] = useSelector((state: IState) => state.incidents.allowToCreate);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(incidentChoose(undefined));
  }, [dispatch]);

  useLayoutEffect(() => {
    let id = props.match.params.id;
    let incident = incidents.find((item) => item.id === Number(id));
    dispatch(incidentChoose(incident));
    // eslint-disable-next-line
  }, [incidents, dispatch]);

  useEffect(() => {
    if (incidents && Array.isArray(incidents)) {
      let sidebarList = incidents?.map((item: TIncident) => {
        let responsible: string;
        if (item.responsibleUser) {
          responsible = `(${item.responsibleUser.name1} ${item.responsibleUser.name2.charAt(
            0,
          )}. ${item.responsibleUser.name3.charAt(0)}.)`;
        } else {
          responsible = '';
        }
        const newItem: TList = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${item.property ? item.property.name : ''} ${
            item.option ? item.option.name : ''
          }`,
          createdAt: item.createdAt,
          responsible: responsible,
          numberResponsible: item.currentResponsible,
          consent: item.consent,
          status: item.statusId,
          finishWork: item.finishWork,
          startWork: item.startWork,
          doneWork: item.doneWork,
          categories: item.categoryId,
          options: item.optionId,
          properties: item.propertyId,
        };
        return newItem;
      });
      sidebarList && setSidebarList(sidebarList);
    }
    // eslint-disable-next-line
  }, [incidents]);

  useEffect(() => {
    if (chooseIncidentId) {
      //Получаем новый выбранный заявка
      const newCurrentIncident = (() => {
        let thisList = incidents.find((item) => item.id === chooseIncidentId);
        if (thisList) return thisList;
      })();
      dispatch(incidentChoose(newCurrentIncident));
    }
    // eslint-disable-next-line
  }, [chooseIncidentId]);
  return (
    <Fragment>
      <IncidentContext.Provider
        value={{ Buttons: IncidentWindowDepartmentButton, match: { path: '/MyDepartmentPage' } }}
      >
        <h1>Мой отдел</h1>
        <Row className="mt-1">
          <Col xs={5}>
            <WrapperSidebar
              list={sidebarList}
              activeId={chooseIncidentId}
              onClick={(id) => {
                setChooseIncidentId(id);
              }}
              title={'Требует согласования'}
              onClickHistory={() => {}}
            />
          </Col>
          <Col>
            <Container>
              <IncidentWindow />
            </Container>
          </Col>
        </Row>
      </IncidentContext.Provider>
    </Fragment>
  );
};

export default memo(MyDepartmentPage);
