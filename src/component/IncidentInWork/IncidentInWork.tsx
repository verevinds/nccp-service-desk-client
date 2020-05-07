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
        <Moment locale="ru" fromNow>
          {startWork}
        </Moment>
      </small>
    </>
  );
};

export default memo(IncidentInWork);
