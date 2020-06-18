import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import IncidentHandleDepartment from '../IncidentHandleDepartment/IncidentHandleDepartment';
export interface IHandleDepartment {}

const HandleDepartment: React.FC<IHandleDepartment> = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant={'outline-secondary'} size="sm" className={'m-1'} onClick={() => setShow(true)}>
        Передать в другой отдел
      </Button>
      {show ? <IncidentHandleDepartment show={show} onHide={() => setShow(false)} /> : undefined}
    </>
  );
};

export default memo(HandleDepartment);
