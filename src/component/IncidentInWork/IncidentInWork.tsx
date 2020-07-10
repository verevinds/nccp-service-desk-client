import React, { memo } from 'react';
import Moment from 'react-moment';
import 'moment/locale/ru';
import PopoverCardUser from '../PopoverCardUser/PopoverCardUser';

import { OverlayTrigger } from 'react-bootstrap';

import { IIncidentInWork } from './interface';

const IncidentInWork: React.FC<IIncidentInWork> = ({ startWork, nameResponsible, number }) => {
  return (
    <div>
      <small>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <div>
              <PopoverCardUser id={number} />
            </div>
          }
        >
          <span className="pointer">{nameResponsible}</span>
        </OverlayTrigger>
        {` принял(а) в работу ${!startWork ? `(на согласовании)` : ''}`}
        {!!startWork ? (
          <Moment locale="ru" fromNow>
            {startWork}
          </Moment>
        ) : undefined}
      </small>
    </div>
  );
};

export default memo(IncidentInWork);
