import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

export default memo(function IncidentWorkButton({
  incident,
  onClick,
  handleOpenModal,
  user,
}) {
  console.log('user', user);
  if (!incident.statusId) {
    return (
      <>
        <hr />
        <Button variant="outline-success" xs="sm" onClick={onClick}>
          Взять в работу
        </Button>{' '}
        {user.position.level ? (
          <Button variant="outline-primary" xs="sm" onClick={() => {}}>
            Назначить ответственного
          </Button>
        ) : null}
      </>
    );
  } else {
    return (
      <Button variant="outline-primary" xs="sm" onClick={handleOpenModal}>
        Изменить
      </Button>
    );
  }
});
