import React, { memo, useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';
import IncidentWindowComments from '../IncidentWindowComments/IncidentWindowComments';
import IncidentWindowFiles from '../IncidentWindowFiles/IncidentWindowFiles';
import IncidentWorkButton from '../IncidentWindowButton/IncidentWindowButton';
import { IncidentContext } from '../Incident/IncidentContext';

// Bootstrap
import { Card, OverlayTrigger, Table } from 'react-bootstrap';
import PopoverCardUser from '../PopoverCardUser/PopoverCardUser';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAt, faPhone, faDesktop } from '@fortawesome/free-solid-svg-icons';

const IncidentWindowBody = ({ handleOpen }) => {
  const { myIncident } = useContext(IncidentContext);
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
      {Array.isArray(incident?.params) &&
        incident?.params.map((item, index) => {
          let value;
          if (typeof item.value === 'boolean') {
            value = item.value ? 'Да' : 'Нет';
          } else {
            value = item.value ? item.value : ' - ';
          }
          return (
            <Card.Text key={index}>
              <b>{item.title}</b>: {value}
            </Card.Text>
          );
        })}
      {!myIncident && <IncidentWorkButton incident={incident} handleOpen={handleOpen} user={user} />}
      <br />
      <IncidentWindowComments />
      <br />
      <IncidentWindowFiles />
    </Card.Body>
  );
};

export default memo(IncidentWindowBody);
