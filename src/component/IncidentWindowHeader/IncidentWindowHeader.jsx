import React, { memo } from 'react';

import { useSelector, shallowEqual } from 'react-redux';
import styles from './styles.module.css';

import IncidentInWork from '../IncidentInWork/IncidentInWork';
import IncidentStatus from '../IncidentStatus/IncidentStatus';

import { Card } from 'react-bootstrap';
import { nameUser } from '../../js/supportingFunction';

const IncidentWindowHeader = () => {
  const incident = useSelector((state) => state.incidents?.current.incident, shallowEqual);

  return (
    <Card.Header className={styles.header}>
      <div className="flex flex_column flex_center">
        <div className="flex flex_row flex_center">
          <div>Заявка №{incident.id} </div>
          {incident.responsibleUser ? (
            <>
              <span className="ml-1 mr-1">|</span>
              <IncidentInWork
                startWork={incident.startWork}
                nameResponsible={nameUser(incident.responsibleUser).initials()}
                number={incident.responsibleUser.number}
              />
            </>
          ) : null}
        </div>
      </div>
      <IncidentStatus />
    </Card.Header>
  );
};

export default memo(IncidentWindowHeader);
