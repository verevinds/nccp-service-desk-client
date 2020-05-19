import React, { memo } from 'react';
import Moment from 'react-moment';
import 'moment/locale/ru';

import { IIncidentInWork } from './interface';

const IncidentInWork: React.FC<IIncidentInWork> = ({
  startWork,
  nameResponsible,
}) => {
  return (
    <>
      <small>
        {`${nameResponsible} принял(а) в работу `}
        {!!startWork ? (
          <Moment locale="ru" fromNow>
            {startWork}
          </Moment>
        ) : undefined}
      </small>
    </>
  );
};

export default memo(IncidentInWork);
