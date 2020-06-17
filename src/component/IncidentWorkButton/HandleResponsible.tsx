import React, { memo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import SetResponsible from '../IncidentHandleResponsible/IncidentHandleResponsible';

export interface IHandleResponsible {
  handleShowResponsible: any;
  showHanldeResponsible: any;
  handleCloseResponsible: any;
  onClick: any;
}

const HandleResponsible: React.FC<IHandleResponsible> = ({
  handleShowResponsible,
  showHanldeResponsible,
  handleCloseResponsible,
  onClick,
}) => {
  return (
    <>
      <Button variant={'outline-secondary'} size="sm" onClick={handleShowResponsible} className={'m-1'}>
        Назначить ответственного
      </Button>
      {showHanldeResponsible ? (
        <SetResponsible show={showHanldeResponsible} onHide={handleCloseResponsible} onClick={onClick} />
      ) : undefined}
    </>
  );
};

export default memo(HandleResponsible);
