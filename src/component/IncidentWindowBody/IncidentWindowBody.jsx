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
import { Card, OverlayTrigger, Table } from 'react-bootstrap';
import PopoverCardUser from '../PopoverCardUser/PopoverCardUser';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAt, faPhone, faDesktop } from '@fortawesome/free-solid-svg-icons';

const IncidentWindowBody = ({ incident, myincident, handleOpenModal }) => {
  //State изменений в инциденте
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);

  function onClick() {
    const incidentData = {
      startWork: dateNow(),
      statusId: Number(1),
    };
    const data = {
      text: this.comment,
      userNumber: user.number,
      incidentId: incident.id,
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
      <br />
      <Card.Title as="h6">Инициатор:</Card.Title>
      <div className={styles.info}>
        <Table size={'sm'} borderless>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faAddressCard} color="#6c757d" size="lg" />
              </td>
              <td>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <div style={{ zIndex: 9999 }}>
                      <PopoverCardUser id={incident.initiatorUser.number} />
                    </div>
                  }
                >
                  <span className="pointer">
                    {`${incident.initiatorUser.name1 || ''} ${incident.initiatorUser.name2 || ''} ${
                      incident.initiatorUser.name3 || ''
                    }`}
                  </span>
                </OverlayTrigger>
              </td>
            </tr>

            <tr>
              <td>
                <FontAwesomeIcon icon={faAt} color="#6c757d" size="lg" />
              </td>
              <td>
                {incident.initiatorUser.email ? (
                  <a href={`mailto:${incident.initiatorUser.email}`}>{incident.initiatorUser.email}</a>
                ) : (
                  'email не указан'
                )}
              </td>
            </tr>

            <tr>
              <td>
                <FontAwesomeIcon icon={faPhone} color="#6c757d" size="lg" />
              </td>
              <td>
                {incident.initiatorUser.phone1 ? <span>{incident.initiatorUser.phone1}</span> : 'телефон не указан'}
              </td>
            </tr>

            <tr>
              <td>
                <FontAwesomeIcon icon={faDesktop} color="#6c757d" size="lg" />
              </td>
              <td>
                {incident.initiatorUser.phone1 ? (
                  <span>{incident.initiatorUser.computer}</span>
                ) : (
                  'номер компьютера не указан'
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <br />
      {incident.text ? (
        <>
          <Card.Title as="h6">Содержание:</Card.Title>
          <hr />
          <Card.Text as="pre" className={styles.textIncident}>
            {incident.text}
          </Card.Text>
        </>
      ) : null}

      {!myincident ? (
        <IncidentWorkButton incident={incident} handleOpenModal={handleOpenModal} onClick={onClick} user={user} />
      ) : null}
      <br />
      <IncidentWindowComments />
      <br />
      <IncidentWindowFiles />
    </Card.Body>
  );
};

export default memo(IncidentWindowBody);
