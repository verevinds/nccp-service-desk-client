import React, { memo, useState } from 'react';
import IncidentHandleDepartment from '../IncidentHandleDepartment/IncidentHandleDepartment';
export interface IHandleDepartment {}

const HandleDepartment: React.FC<IHandleDepartment> = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div onClick={() => setShow(true)}>Передать в другой отдел</div>
      {show ? <IncidentHandleDepartment show={show} onHide={() => setShow(false)} /> : undefined}
    </>
  );
};

export default memo(HandleDepartment);
