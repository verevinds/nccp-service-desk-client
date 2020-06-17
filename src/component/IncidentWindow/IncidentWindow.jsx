import React, { memo, useEffect, useState, useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/ru';
import IncidentHandleStatus from '../IncidentHandleStatus/IncidentHandleStatus';

import IncidentWindowHeader from '../IncidentWindowHeader/IncidentWindowHeader';

// Bootstrap
import { Container, Card } from 'react-bootstrap';
import IncidentWindowBody from '../IncidentWindowBody/IncidentWindowBody';
import { IncidentContext } from '../Incident/IncidentContext';

const IncidentWindow = () => {
  const incident = useSelector((state) => state.incidents?.current.incident, shallowEqual);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  if (!!incident) {
    return (
      <>
        {show ? <IncidentHandleStatus show={show} onHide={handleClose} incident={incident} /> : null}
        <Container>
          <Card>
            <IncidentWindowHeader />

            <IncidentWindowBody handleOpen={handleOpen} />
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
    return <h2>Выберите заявку</h2>;
  }
};

export default memo(IncidentWindow);
