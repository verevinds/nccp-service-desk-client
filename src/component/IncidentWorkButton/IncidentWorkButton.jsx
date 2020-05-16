import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import SetResponsible from '../SetResponsible/SetResponsible';

export default memo(function IncidentWorkButton({
  incident,
  onClick,
  handleOpenModal,
  user,
}) {
  const [showSetResponsible, SetShowSetResponsible] = useState(false);
  const handleShow = () => {
    SetShowSetResponsible(true);
  };
  const handleClose = () => {
    SetShowSetResponsible(false);
  };
  return (
    <>
      <hr />
      {!incident.statusId ? (
        <>
          <Button
            variant="outline-success"
            xs="sm"
            onClick={onClick.bind(null, user.number)}
          >
            Взять в работу
          </Button>{' '}
        </>
      ) : (
        <>
          <Button variant="outline-primary" xs="sm" onClick={handleOpenModal}>
            Изменить
          </Button>{' '}
        </>
      )}
      {user.position.level ? (
        <>
          <Button variant="outline-primary" xs="sm" onClick={handleShow}>
            Назначить ответственного
          </Button>
          {showSetResponsible ? (
            <SetResponsible
              show={showSetResponsible}
              onHide={handleClose}
              onClick={onClick}
            />
          ) : undefined}
        </>
      ) : null}
    </>
  );
});
