import React, { memo, Fragment, useEffect, useContext, useLayoutEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { IState, TUser, TIncident } from '../interface';
import { AppContext } from '../AppContext';
import { incidentAllowToCreateRequestSuccessed, incidentChoose } from '../redux/actionCreators/incidentAction';
import { paramsIncident } from '../js/paramsIncident';
import WrapperSidebar from '../component/Sidebar/WrapperSidebar';
import { TList } from '../component/Sidebar/interface';
import IncidentWindow from '../component/IncidentWindow/IncidentWindow';
export interface IMyDepartmentPage {}

const MyDepartmentPage: React.FC<IMyDepartmentPage> = (props) => {
  const [chooseIncidentId, setChooseIncidentId] = useState<number | undefined>();
  const [sidebarList, setSidebarList] = useState<(TList | never)[]>([]);
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const incidents: TIncident[] = useSelector((state: IState) => state.incidents.allowToCreate);
  const isUpdate = useSelector((state: IState) => state.incidents.isUpdate);

  const { Api } = useContext(AppContext);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('isUpdate', isUpdate);
  }, [isUpdate]);

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
    </Fragment>
  );
};

export default memo(MyDepartmentPage);
