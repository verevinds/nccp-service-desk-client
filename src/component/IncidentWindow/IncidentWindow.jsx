import React, { memo, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/ru';
import IncidentHandleStatus from '../IncidentHandleStatus/IncidentHandleStatus';

import IncidentWindowHeader from '../IncidentWindowHeader/IncidentWindowHeader';

// Bootstrap
import { Container, Card } from 'react-bootstrap';
import IncidentWindowBody from '../IncidentWindowBody/IncidentWindowBody';
import { IncidentWindowContext } from './IncidentWindowContext';
import IncidentHandleVise from '../IncidentHandleVise/IncidentHandleVise';
import CreateIncident from '../CreateIncident/CreateIncident';

const IncidentWindow = () => {
  const [inWork, setInWork] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [vise, setVise] = useState(false);
  const [show, setShow] = useState(false);
  const incident = useSelector((state) => state.incidents?.current.incident, shallowEqual);

  const handleClose = () => setShow(false);
  const handleOpen = function () {
    setShow(true);

    return {
      inWork() {
        setInWork(true);
      },
    };
  };

  if (!!incident) {
    return (
      <IncidentWindowContext.Provider
        value={{
          handleVise: { vise, setVise },
          handleModify: { setIsModify },
        }}
      >
        {isModify ? (
          <CreateIncident showModal={isModify} handleClose={() => setIsModify(false)} isModify={isModify} />
        ) : undefined}
        {show ? <IncidentHandleStatus show={show} onHide={handleClose} incident={incident} inWork={inWork} /> : null}
        {vise ? <IncidentHandleVise /> : undefined}
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
      </IncidentWindowContext.Provider>
    );
  } else {
    return <h2>Выберите заявку</h2>;
  }
};

export default memo(IncidentWindow);
