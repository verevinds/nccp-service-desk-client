import React, { memo, useState } from 'react';
import IncidentHandleVise from '../IncidentHandleVise/IncidentHandleVise';

export interface IHandleVise {}

const HandleVise: React.FC<IHandleVise> = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div onClick={() => setShow(true)}>Оправить на визирование</div>
      {show ? <IncidentHandleVise show={show} onHide={() => setShow(false)} /> : undefined}
    </>
  );
};

export default memo(HandleVise);
