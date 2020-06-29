import React, { memo, useState } from 'react';
import IncidentHandleVise from '../IncidentHandleVise/IncidentHandleVise';

export interface IHandleVise {}

const HandleVise: React.FC<IHandleVise> = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div onClick={() => setShow(true)}>Оправить на визирование</div>
    </>
  );
};

export default memo(HandleVise);
