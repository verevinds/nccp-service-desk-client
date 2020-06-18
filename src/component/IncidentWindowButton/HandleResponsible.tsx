import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import SetResponsible from '../IncidentHandleResponsible/IncidentHandleResponsible';

export interface IHandleResponsible {
  onClick: any;
}

const HandleResponsible: React.FC<IHandleResponsible> = ({ onClick }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button variant={'outline-secondary'} size="sm" onClick={() => setShow(true)} className={'m-1'}>
        Назначить ответственного
      </Button>
      <SetResponsible show={show} onHide={() => setShow(false)} onClick={onClick} />
    </>
  );
};

export default memo(HandleResponsible);
