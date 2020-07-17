import React, { memo, useState } from 'react';
import IncidentHandleResponsible from '../IncidentHandleResponsible/IncidentHandleResponsible';

export interface IHandleResponsible {}

const HandleResponsible: React.FC<IHandleResponsible> = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div onClick={() => setShow(true)}>Назначить ответственного</div>
      {show ? <IncidentHandleResponsible show={show} onHide={() => setShow(false)} /> : undefined}
    </>
  );
};

export default memo(HandleResponsible);
