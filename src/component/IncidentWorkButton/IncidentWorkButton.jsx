import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import SetResponsible from '../IncidentHandleResponsible/IncidentHandleResponsible';
import styles from './styles.module.css';
import IncidentHandleDepartment from '../IncidentHandleDepartment/IncidentHandleDepartment';

export default memo(function IncidentWorkButton({
  incident,
  onClick,
  handleOpenModal,
  user,
}) {
  const [showHanldeResponsible, SetShowHanldeResponsible] = useState(false);
  const handleShowResponsible = () => {
    SetShowHanldeResponsible(true);
  };
  function handleCloseResponsible() {
    SetShowHanldeResponsible(false);
  }

  const [showHandleDepartment, setShowHandleDepartment] = useState(false);
  const handleShowDepartment = () => {
    setShowHandleDepartment(true);
  };
  const handleCloseDepartment = () => {
    setShowHandleDepartment(false);
  };

  return (
    <>
      <hr />
      <div className={styles.bar}>
        <div>
          {user.position.level ? (
            <>
              <Button
                variant={'light'}
                size="sm"
                onClick={handleShowResponsible}
              >
                Назначить ответственного
              </Button>{' '}
              {showHanldeResponsible ? (
                <SetResponsible
                  show={showHanldeResponsible}
                  onHide={handleCloseResponsible}
                  onClick={onClick}
                />
              ) : undefined}
              <Button
                variant={'light'}
                size="sm"
                onClick={handleShowDepartment}
              >
                Передать в другой отдел
              </Button>
              {showHandleDepartment ? (
                <IncidentHandleDepartment
                  show={showHandleDepartment}
                  onHide={handleCloseDepartment}
                  onClick={onClick}
                />
              ) : undefined}
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
