import React, { memo, useState, useEffect } from 'react';
import IncidentWindow from '../IncidentWindow/IncidentWindow';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { incidentChoose } from '../../redux/actionCreators/incidentAction';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const Incident = ({ list, isLoading, myincident }) => {
  const dispatch = useDispatch();
  const { incident } = useSelector(
    (state) => state.incidents.current,
    shallowEqual,
  );
  const [chooseIncidentId, setChooseIncidentId] = useState();

  //currentIncident хранит текущий инцидент, setCurrentIncident изменяется состояние currentIncident
  useEffect(() => {
    //Получаем новый выбранный инцидент
    const newCurrentIncident = list.find(
      (item) => item.id === chooseIncidentId,
    );
    dispatch(incidentChoose(newCurrentIncident));
    // eslint-disable-next-line
  }, [chooseIncidentId, list]); // Использовать эффект если изменились параметры chooseIncidentId, list поменяли свое состояние

  const [sidebarList, setSidebarList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line
    console.log(list);
    setSidebarList(
      list.map((item) => {
        let responsible;
        if (item.responsibleUser) {
          responsible = `${
            item.responsibleUser.name1
          } ${item.responsibleUser.name2.charAt(
            0,
          )}. ${item.responsibleUser.name2.charAt(0)}.`;
        }
        const newItem = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${
            item.property ? item.property.name : ''
          } ${item.option ? item.option.name : ''}`,
          createdAt: item.createdAt,
          responsible,
          status: item.statusId,
        };
        return newItem;
      }),
    );
    // eslint-disable-next-line
  }, [list]);

  return (
    <Row className="mt-3">
      <Col xs={5}>
        <Sidebar
          title={myincident ? 'Мои инциденты' : 'Инциденты'}
          list={sidebarList}
          onClick={setChooseIncidentId}
          activeId={chooseIncidentId}
          isLoading={isLoading}
          badge={!myincident}
        />
      </Col>
      <Col>
        <Container>
          {incident ? (
            <IncidentWindow incident={incident} myincident={myincident} />
          ) : null}
        </Container>
      </Col>
    </Row>
  );
};

export default memo(Incident);
