import React, { memo, useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment/locale/ru';
import IncidentHandleStatus from '../IncidentHandleStatus/IncidentHandleStatus';

import IncidentWindowHeader from '../IncidentWindowHeader/IncidentWindowHeader';

// Bootstrap
import { Container, Card } from 'react-bootstrap';
import IncidentWindowBody from '../IncidentWindowBody/IncidentWindowBody';

const IncidentWindow = ({ incident, myincident }) => {
  useEffect(() => {}, [incident]);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  if (!!incident) {
    return (
      <>
        {showModal ? (
          <IncidentHandleStatus
            show={showModal}
            onHide={handleCloseModal}
            incident={incident}
          />
        ) : null}
        <Container>
          <Card>
            <IncidentWindowHeader incident={incident} myincident={myincident} />

            <IncidentWindowBody
              incident={incident}
              myincident={myincident}
              handleOpenModal={handleOpenModal}
            />
            <Card.Footer className="text-right">
              <small>
                <i>
                  <b>Создан:</b>{' '}
                  <Moment locale="ru" fromNow>
                    {incident.createdAt}
                  </Moment>
                </i>
                {' | '}
                <i>
                  <b>Последнее обновление:</b>{' '}
                  <Moment locale="ru" fromNow>
                    {incident.updatedAt}
                  </Moment>
                </i>
              </small>
            </Card.Footer>
          </Card>
        </Container>
      </>
    );
  } else {
    return <h2>Выберите инцидент</h2>;
  }
};

export default memo(IncidentWindow);
