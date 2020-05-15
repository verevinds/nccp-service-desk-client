import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

/** Action creators */
import { incidentChoose } from '../redux/actionCreators/incidentAction';

/**My components */
import Incident from '../component/Incident/Incident';
import SidebarWrapper from '../component/Sidebar/SidebarWrapper';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const MainPage = () => {
  const { list, history } = useSelector(
    (state) => state.incidents,
    shallowEqual,
  );
  const myincident = false;
  const dispatch = useDispatch();
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
    console.log('newCurrentIncident', newCurrentIncident);
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
        <SidebarWrapper
          title={myincident ? 'Мои инциденты' : 'Инциденты'}
          list={sidebarList}
          onClick={setChooseIncidentId}
          activeId={chooseIncidentId}
          badge={!myincident}
        />
      </Col>
      <Incident />
    </Row>
  );
};

export default memo(MainPage);
