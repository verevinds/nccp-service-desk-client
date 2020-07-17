import React, { memo, useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';
import IncidentWindowComments from '../IncidentWindowComments/IncidentWindowComments';
import IncidentWindowFiles from '../IncidentWindowFiles/IncidentWindowFiles';
import { IncidentContext } from '../Incident/IncidentContext';

// Bootstrap
import { Card, OverlayTrigger, Table } from 'react-bootstrap';
import PopoverCardUser from '../PopoverCardUser/PopoverCardUser';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAt, faPhone, faDesktop } from '@fortawesome/free-solid-svg-icons';
import IncidentWindowBodyCustom from '../IncidentWindowBodyCustom/IncidentWindowBodyCustom';
import IncidentWindowVisa from '../IncidentWindowVisa/IncidentWindowVisa';
import { nameUser } from '../../js/supportingFunction';

const IncidentWindowBody = ({ handleOpen }) => {
  const { myIncident, Buttons } = useContext(IncidentContext);
  //State изменений в заявкае
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const incident = useSelector((state) => state.incidents?.current.incident, shallowEqual);
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
                  <span className="pointer">{nameUser(incident.initiatorUser)?.fullName()}</span>
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
      <IncidentWindowBodyCustom />
      <Buttons incident={incident} handleOpen={handleOpen} user={user} myIncident={myIncident} />
      <br />
      <IncidentWindowVisa />
      <br />
      <IncidentWindowComments />
      <br />
      <IncidentWindowFiles />
    </Card.Body>
  );
};

export default memo(IncidentWindowBody);
