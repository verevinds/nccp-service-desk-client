import React, { memo, useEffect, useState } from 'react';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';
import Sidebar from '../component/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { list, isLoading } = useSelector((state) => state.incidents);
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
          name: `${item.category ? item.category.name : null} ${
            item.property ? item.property.name : null
          } ${item.option ? item.option.name : null}`,
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
        {isLoading ? (
          <Sidebar
            title={'Инциденты'}
            list={sidebarList}
            onClick={setChooseIncidentId}
            activeId={chooseIncidentId}
          />
        ) : (
          'Загрузка данных'
        )}
      </Col>
      <Col>
        <Container>
          {currentIncident ? <Incident incident={currentIncident} /> : null}
        </Container>
      </Col>
    </Row>
  );
};

export default memo(MainPage);
