import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import SetResponsible from '../SetResponsible/SetResponsible';
import styles from './styles.module.css';

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
      <div className={styles.bar}>
        <div>
          {user.position.level ? (
            <>
              <Button variant={'light'} size="sm" onClick={handleShow}>
                Назначить ответственного
              </Button>{' '}
              {showSetResponsible ? (
                <SetResponsible
                  show={showSetResponsible}
                  onHide={handleClose}
                  onClick={onClick}
                />
              ) : undefined}
              <Button variant={'light'} size="sm" onClick={() => {}}>
                Передать в другой отдел
              </Button>
            </>
          ) : null}
        </div>
        {!incident.statusId ? (
          <>
            <Button
              variant="outline-success"
              onClick={onClick.bind(null, user.number)}
            >
              Взять в работу
            </Button>{' '}
          </>
        ) : (
          <>
            <Button variant="outline-primary" onClick={handleOpenModal}>
              Изменить
            </Button>{' '}
          </>
        )}
      </div>
    </>
  );
});
