import React, { memo, useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

/** Action creators */
import { incidentChoose } from '../../redux/actionCreators/incidentAction';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { incidentHistoryRequestSuccessed } from '../../redux/actionCreators/incidentAction';

/** My components */
import SidebarWrapper from '../Sidebar/WrapperSidebar';
import IncidentWindow from '../IncidentWindow/IncidentWindow';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';
import { IncidentContext } from './IncidentContext';

const Incident = () => {
  let { params, title, myIncident } = useContext(IncidentContext);
  const { user } = useSelector((state) => state.auth);
  let incidents = useSelector((state) => state.incidents, shallowEqual);
  const { history } = useSelector((state) => state.incidents, shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(incidents.current.incident);
  }, [incidents.current.incident]);
  const list = useMemo(() => {
    if (!myIncident) return incidents?.list;
    else return incidents?.myList;
  }, [incidents, myIncident]);

  const fetchIncident = useCallback(
    (params, actionSuccessed) => {
      dispatch(
        queryApi({
          route: 'incidents/history',
          actionSuccessed,
          params,
        }),
      );
    },
    // eslint-disable-next-line
    [dispatch],
  );

  const onClickHistory = useCallback(() => {
    let historyParams;
    if (!myIncident) {
      let responsibles = user?.position?.responsibles;
      let arrayCategoryId = [];
      let arrayPropertyId = [];
      let arrayOptionId = [];
      if (Array.isArray(responsibles))
        responsibles.forEach((item) => {
          if (item.categoryId) arrayCategoryId.push(item.categoryId);
          if (item.propertyId) arrayPropertyId.push(item.propertyId);
          if (item.optionId) arrayOptionId.push(item.optionId);
        });
      arrayCategoryId = Array.from(new Set(arrayCategoryId));
      arrayPropertyId = Array.from(new Set(arrayPropertyId));
      arrayOptionId = Array.from(new Set(arrayOptionId));
      let paramsResponsible = { departmentId: user?.departmentId };

      if (arrayCategoryId.length > 0)
        Object.assign(paramsResponsible, { arrayCategoryId: JSON.stringify(arrayCategoryId) });
      if (arrayPropertyId.length > 0)
        Object.assign(paramsResponsible, { arrayPropertyId: JSON.stringify(arrayPropertyId) });
      if (arrayOptionId.length > 0) Object.assign(paramsResponsible, { arrayOptionId: JSON.stringify(arrayOptionId) });

      historyParams = { ...params, history: 'true', ...paramsResponsible };
    } else {
      historyParams = { ...params, history: 'true' };
    }

    fetchIncident(historyParams, incidentHistoryRequestSuccessed);
    // eslint-disable-next-line
  }, [params, fetchIncident, incidents.isUpdate]);
  const [chooseIncidentId, setChooseIncidentId] = useState();

  //currentIncident хранит текущий заявка, setCurrentIncident изменяется состояние currentIncident
  useEffect(() => {
    if (chooseIncidentId) {
      //Получаем новый выбранный заявка
      const newCurrentIncident = (() => {
        let thisHistory = history.find((item) => item.id === chooseIncidentId);
        let thisList = list.find((item) => item.id === chooseIncidentId);
        if (thisHistory) return thisHistory;
        if (thisList) return thisList;
      })();
      dispatch(incidentChoose(newCurrentIncident));
    }
    // eslint-disable-next-line
  }, [chooseIncidentId, history]); // Использовать эффект если изменились параметры chooseIncidentId, list поменяли свое состояние

  const [sidebarList, setSidebarList] = useState([]);

  useEffect(() => {
    setSidebarList(
      list.map((item) => {
        let responsible;
        if (item.responsibleUser) {
          responsible = `(${item.responsibleUser.name1} ${item.responsibleUser.name2.charAt(
            0,
          )}. ${item.responsibleUser.name3.charAt(0)}.)`;
        } else {
          responsible = '';
        }
        const newItem = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${item.property ? item.property.name : ''} ${
            item.option ? item.option.name : ''
          }`,
          createdAt: item.createdAt,
          responsible,
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
      }),
    );
    // eslint-disable-next-line
  }, [list]);

  return (
    <Row className="mt-1">
      <Col xs={5}>
        <SidebarWrapper
          title={title}
          list={sidebarList}
          onClick={(id) => {
            setChooseIncidentId(id);
          }}
          activeId={chooseIncidentId}
          onClickHistory={onClickHistory}
        />
      </Col>
      <Col xs={7}>
        <Container>
          <IncidentWindow />
        </Container>
      </Col>
    </Row>
  );
};

export default memo(Incident);
