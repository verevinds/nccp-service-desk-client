import React, { memo, useEffect, useState } from 'react';

/**Bootstrap components */
import { Row, Col, Container } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';
import Sidebar from '../component/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { list, isLoading } = useSelector((state) => state.incidents);
  const [currentIdIncident, setCurrentIdIncident] = useState();

  const [currentIncident, setCurrentIncident] = useState();
  useEffect(() => {
    const newCurrentIncident = list.filter(
      (item) => item.id === currentIdIncident,
    )[0];
    setCurrentIncident(newCurrentIncident);
    // eslint-disable-next-line
  }, [currentIdIncident]);

  const [sidebarList, setSidebarList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line
    list.map((item) => {
      setSidebarList([
        ...sidebarList,
        {
          name: `${item.category ? item.category.name : null} ${
            item.property ? item.property.name : null
          } ${item.option ? item.option.name : null}`,
          id: item.id,
          createdAt: item.createdAt,
        },
      ]);
    });
    // eslint-disable-next-line
  }, [list]);

  return (
    <Row className="mt-3">
      <Col xs={5}>
        {isLoading ? (
          <Sidebar
            title={'Инциденты'}
            list={sidebarList}
            onClick={setCurrentIdIncident}
            activeId={currentIdIncident}
          />
        ) : (
          'Загрузка данных'
        )}
      </Col>
      <Col>
        <Container>
          <Incident incident={currentIncident} />
        </Container>
      </Col>
    </Row>
  );
};

export default memo(MainPage);
