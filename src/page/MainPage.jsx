import React, { memo, useEffect, useState } from 'react';

/**Bootstrap components */
import { Row, Col } from 'react-bootstrap';
import Incident from '../component/Incident/Incident';
import Sidebar from '../component/Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { list, isLoading } = useSelector((state) => state.incidents);
  const [currentIdIncident, setCurrentIdIncident] = useState();

  const [currentIncident, setCurrentIncident] = useState();
  useEffect(() => {
    console.log('currentIdIncident', currentIdIncident);
    const newCurrentIncident = list.filter(
      (item) => item.id === currentIdIncident,
    )[0];
    setCurrentIncident(newCurrentIncident);
  }, [currentIdIncident]);

  return (
    <Row className="mt-3">
      <Col xs={5}>
        <Sidebar
          list={list}
          isLoading={isLoading}
          onClick={setCurrentIdIncident}
          activeId={currentIdIncident}
        />
      </Col>
      <Col>
        <Incident incident={currentIncident} />
      </Col>
    </Row>
  );
};

export default memo(MainPage);
