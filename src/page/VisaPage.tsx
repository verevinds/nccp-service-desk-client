import React, { memo, Fragment, useContext, useLayoutEffect, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { incidentVisaRequestSuccessed, incidentChoose } from '../redux/actionCreators/incidentAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { TIncident, IState, TUser } from '../interface';
import { TList } from '../component/Sidebar/interface';
import { Row, Col, Container } from 'react-bootstrap';
import WrapperSidebar from '../component/Sidebar/WrapperSidebar';
import IncidentWindow from '../component/IncidentWindow/IncidentWindow';
import { IncidentContext } from '../component/Incident/IncidentContext';
import IncidentWindowVisaButton from '../component/IncidentWindowVisaButton/IncidentWindowVisaButton';
import { IncidentWindowContext } from '../component/IncidentWindow/IncidentWindowContext';
export interface IVisaPage {}

const VisaPage: React.FC<IVisaPage> = (props) => {
  const [chooseIncidentId, setChooseIncidentId] = useState<number | undefined>();
  const [sidebarList, setSidebarList] = useState<(TList | never)[]>([]);
  const dispatch = useDispatch();
  const { Api } = useContext(AppContext);
  const incidents: TIncident[] = useSelector((state: IState) => state.incidents.visa);
  const isUpdate: TIncident[] = useSelector((state: IState) => state.incidents.isUpdate);
  const user: TUser = useSelector((state: IState) => state.auth.user);

  useLayoutEffect(() => {
    dispatch(incidentChoose(undefined));
  }, []);

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
      <IncidentContext.Provider value={{ Buttons: IncidentWindowVisaButton, match: { path: '/visa' } }}>
        <h1>Согласование</h1>
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

export default memo(VisaPage);
