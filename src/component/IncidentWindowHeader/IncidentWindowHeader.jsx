import React, { memo, useContext } from 'react';

import styles from './styles.module.css';

import IncidentInWork from '../IncidentInWork/IncidentInWork';
import IncidentStatus from '../IncidentStatus/IncidentStatus';

import { Card } from 'react-bootstrap';
import { IncidentContext } from '../Incident/IncidentContext';

const IncidentWindowHeader = () => {
  const {
    incidents: {
      current: { incident },
    },
  } = useContext(IncidentContext);
  return (
    <Card.Header className={styles.header}>
      <div>
        Заявка №{incident.id}{' '}
        {incident.responsibleUser ? (
          <>
            {'| '}
            <IncidentInWork
              startWork={incident.startWork}
              nameResponsible={`
                ${incident.responsibleUser.name1} ${incident.responsibleUser.name2.charAt(
                0,
              )}.${incident.responsibleUser.name3.charAt(0)}.`}
              number={incident.responsibleUser.number}
            />
          </>
        ) : null}
      </div>
      <IncidentStatus />
    </Card.Header>
  );
};

export default memo(IncidentWindowHeader);
