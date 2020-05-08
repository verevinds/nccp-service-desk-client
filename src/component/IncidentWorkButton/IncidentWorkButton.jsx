import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

export default memo(function IncidentWorkButton({ user, onClick }) {
  return (
    <>
      <hr />
      {!user ? (
        <Button variant="outline-success" xs="sm" onClick={onClick}>
          Взять в работу
        </Button>
      ) : (
        <Button>Сохранить</Button>
      )}
    </>
  );
});
