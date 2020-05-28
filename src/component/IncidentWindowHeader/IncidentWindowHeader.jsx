import React, { memo } from 'react';

import styles from './styles.module.css';

import IncidentInWork from '../IncidentInWork/IncidentInWork';
import IncidentStatus from '../IncidentStatus/IncidentStatus';

import { Card } from 'react-bootstrap';

const IncidentWindowHeader = ({ incident, myincident }) => {
  return (
    <Card.Header className={styles.header}>
      <div>
        Инцидент №{incident.id}{' '}
        {incident.responsibleUser ? (
          <>
            {'| '}
            <IncidentInWork
              startWork={incident.startWork}
              nameResponsible={`
                ${
                  incident.responsibleUser.name1
                } ${incident.responsibleUser.name2.charAt(
                0,
              )}.${incident.responsibleUser.name3.charAt(0)}.`}
              number={incident.responsibleUser.number}
            />
          </>
        ) : null}
      </div>
      <IncidentStatus
        myincident={myincident | undefined}
        status={incident.statusId}
      />
    </Card.Header>
  );
};

export default memo(IncidentWindowHeader);
