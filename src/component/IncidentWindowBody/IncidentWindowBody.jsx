import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import 'moment/locale/ru';
import styles from './styles.module.css';
import dateNow from '../../js/dateNow';
import IncidentWindowComments from '../IncidentWindowComments/IncidentWindowComments';
import IncidentWindowFiles from '../IncidentWindowFiles/IncidentWindowFiles';
import IncidentWorkButton from '../IncidentWorkButton/IncidentWorkButton';

//ActionCreator
import { incidentCreate } from '../../redux/actionCreators/incidentAction';
import { queryApi } from '../../redux/actionCreators/queryApiAction';

// Bootstrap
import { Card, OverlayTrigger } from 'react-bootstrap';
import PopoverCardUser from '../PopoverCardUser/PopoverCardUser';

const IncidentWindowBody = ({ incident, myincident, handleOpenModal }) => {
  //State изменений в инциденте
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  function onClick() {
    const incidentData = {
      startWork: dateNow(),
      statusId: Number(1),
    };
    if (this.isConsent) {
      incidentData.startWork = null;
      incidentData.statusId = 0;
    }
    if (!!this.bodyData) {
      Object.assign(incidentData, this.bodyData);
    }
    dispatch(
      queryApi({
        route: 'incidents',
        method: 'put',
        actionUpdate: incidentCreate,
        data: incidentData,
        id: incident.id,
      }),
    );
    const data = {
      text: this.comment,
      userNumber: user.number,
      incidentId: incident.id,
    };
    dispatch(
      queryApi({
        route: 'comments',
        method: 'post',
        actionUpdate: incidentCreate,
        data,
        id: incident.id,
      }),
    );
  }
  return (
    <Card.Body className={styles.window}>
      <Card.Title>
        {!!incident.category ? incident.category.name : null}

        {!!incident.property ? ` / ${incident.property.name}` : null}

        {!!incident.option ? ` /  ${incident.option.name}` : null}
      </Card.Title>
      <Card.Text></Card.Text>

      <Card.Text>
        <span>Инициатор: </span>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <div>
              <PopoverCardUser id={incident.initiatorUser.number} />
            </div>
          }
        >
          <span className="pointer">
            {`${incident.initiatorUser.name1 || ''} ${
              incident.initiatorUser.name2 || ''
            } ${incident.initiatorUser.name3 || ''}`}
          </span>
        </OverlayTrigger>
      </Card.Text>
      <Card.Text>
        {!!incident.initiatorUser
          ? `Email: ${incident.initiatorUser.email} `
          : null}
      </Card.Text>
      <Card.Text>
        {!!incident.initiatorUser
          ? `Тел.: ${incident.initiatorUser.phone1} `
          : null}
      </Card.Text>
      {incident.text ? (
        <>
          <hr />
          <Card.Text as="pre" className={styles.textIncident}>
            {incident.text}
          </Card.Text>
        </>
      ) : null}

      {!myincident ? (
        <IncidentWorkButton
          incident={incident}
          handleOpenModal={handleOpenModal}
          onClick={onClick}
          user={user}
        />
      ) : null}
      <br />
      <IncidentWindowComments />
      <br />
      <IncidentWindowFiles />
    </Card.Body>
  );
};

export default memo(IncidentWindowBody);
