import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

/** Action creators */
import { incidentChoose } from '../../redux/actionCreators/incidentAction';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { incidentHistoryRequestSuccessed } from '../../redux/actionCreators/incidentAction';

/** My components */
import SidebarWrapper from '../Sidebar/SidebarWrapper';
import IncidentWindow from '../IncidentWindow/IncidentWindow';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const Incident = ({ list, params, title, badge, actionSuccessed }) => {
  const { history, current } = useSelector(
    (state) => state.incidents,
    shallowEqual,
  );

  const incidents = useSelector((state) => state.incidents, shallowEqual);
  const dispatch = useDispatch();
  const fetchIncident = useCallback(
    (params, actionSuccessed) => {
      dispatch(
        queryApi({
          route: 'incidents',
          actionSuccessed,
          params,
        }),
      );
    },
    // eslint-disable-next-line
    [dispatch],
  );
  useLayoutEffect(() => {
    if (!!params) {
      fetchIncident(params, actionSuccessed);
    }
    // eslint-disable-next-line
  }, [incidents.isUpdate, params]);
  const onClickHistory = useCallback(() => {
    let historyParams = { ...params, history: 'true' };
    fetchIncident(historyParams, incidentHistoryRequestSuccessed);
    // eslint-disable-next-line
  }, [params, fetchIncident, incidents.isUpdate]);
  const [chooseIncidentId, setChooseIncidentId] = useState();

  //currentIncident хранит текущий инцидент, setCurrentIncident изменяется состояние currentIncident
  useEffect(() => {
    //Получаем новый выбранный инцидент
    const newCurrentIncident = (() => {
      let thisHistory = history.find((item) => item.id === chooseIncidentId);
      let thisList = list.find((item) => item.id === chooseIncidentId);
      if (thisHistory) return thisHistory;
      if (thisList) return thisList;
    })();
    dispatch(incidentChoose(newCurrentIncident));
    // eslint-disable-next-line
  }, [chooseIncidentId, list, history]); // Использовать эффект если изменились параметры chooseIncidentId, list поменяли свое состояние
  const [sidebarList, setSidebarList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line
    setSidebarList(
      list.map((item) => {
        let responsible;
        if (item.responsibleUser) {
          responsible = `(${
            item.responsibleUser.name1
          } ${item.responsibleUser.name2.charAt(
            0,
          )}. ${item.responsibleUser.name3.charAt(0)}.)`;
        } else {
          responsible = '';
        }
        const newItem = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${
            item.property ? item.property.name : ''
          } ${item.option ? item.option.name : ''}`,
          createdAt: item.createdAt,
          responsible,
          numberResponsible: item.currentResponsible,
          consent: item.consent,
          status: item.statusId,
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
          onClick={setChooseIncidentId}
          activeId={chooseIncidentId}
          badge={!badge}
          onClickHistory={onClickHistory}
        />
      </Col>
      <Col xs={7}>
        <Container>
          {current.incident ? (
            <IncidentWindow incident={current.incident} myincident={badge} />
          ) : null}
        </Container>
      </Col>
    </Row>
  );
};

export default memo(Incident);
