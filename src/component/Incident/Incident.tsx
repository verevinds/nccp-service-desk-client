import React, { memo, useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { IState, TIncident, TAuth, TIncidents } from '../../interface';
import SpinnerGrow from '../SpinnerGrow/SpinnerGrow';

const Incident = () => {
  // Обработчик состояния номера выбранной заявки
  const [chooseIncidentId, setChooseIncidentId] = useState();
  // Получить параметры, заголовок, и признак моей страницы из контекста
  const { params, title, isMyIncidentsPage, incidents } = useContext(IncidentContext);
  // Получить авторизованного сотрудника из хранилища
  const { user }: TAuth = useSelector((state: IState) => state.auth);
  // Получить список истории инцидентов, рабочих и моих инцидентов, и признак обновления данных из хранилища
  const { history, isUpdate }: TIncidents = useSelector((state: IState) => state.incidents);
  // Подключить хук для активации action creators
  const dispatch = useDispatch();

  /** Создать Callback для работы с API по заявкам */
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

  /** Создать обработку события клика для историй */
  const onClickHistory = useCallback(() => {
    let historyParams;
    if (!isMyIncidentsPage) {
      let responsibles = user?.position?.responsibles;
      let arrayCategoryId: (number | never)[] = [];
      let arrayPropertyId: (number | never)[] = [];
      let arrayOptionId: (number | never)[] = [];
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
  }, [params, fetchIncident, isUpdate]);

  useEffect(() => {
    if (chooseIncidentId) {
      const thisHistory = history?.find((item: TIncident) => item.id === chooseIncidentId);
      const thisList = incidents?.find((item: TIncident) => item.id === chooseIncidentId);

      const incident = thisHistory ? thisHistory : thisList;

      dispatch(incidentChoose(incident));
    }
  }, [chooseIncidentId, history, incidents, dispatch]);

  return (
    <Row className="mt-1">
      <Col xs={5}>
        {incidents ? (
          <SidebarWrapper
            title={title}
            list={incidents}
            onClick={(id) => {
              setChooseIncidentId(id);
            }}
            activeId={chooseIncidentId}
            onClickHistory={onClickHistory}
          />
        ) : (
          <SpinnerGrow />
        )}
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
