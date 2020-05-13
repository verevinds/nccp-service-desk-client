import React, { memo, useState, useEffect } from 'react';
import IncidentWindow from '../IncidentWindow/IncidentWindow';
import Sidebar from '../Sidebar/Sidebar';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';

const Incident = ({ list, isLoading, myincident }) => {
  const [chooseIncidentId, setChooseIncidentId] = useState();

  //currentIncident хранит текущий инцидент, setCurrentIncident изменяется состояние currentIncident
  const [currentIncident, setCurrentIncident] = useState();
  useEffect(() => {
    //Получаем новый выбранный инцидент
    const newCurrentIncident = list.find(
      (item) => item.id === chooseIncidentId,
    );
    //
    setCurrentIncident(newCurrentIncident);
    // eslint-disable-next-line
  }, [chooseIncidentId, list]); // Использовать эффект если изменились параметры chooseIncidentId, list поменяли свое состояние

  const [sidebarList, setSidebarList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line

    setSidebarList(
      list.map((item) => {
        const newItem = {
          id: item.id,
          name: `${item.category ? item.category.name : ''} ${
            item.property ? item.property.name : ''
          } ${item.option ? item.option.name : ''}`,
          createdAt: item.createdAt,
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
          {currentIncident ? (
            <IncidentWindow
              incident={currentIncident}
              myincident={myincident}
            />
          ) : null}
        </Container>
      </Col>
    </Row>
  );
};

export default memo(Incident);
