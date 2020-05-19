import React, { memo, useState, useLayoutEffect, useMemo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import SetResponsible from '../IncidentHandleResponsible/IncidentHandleResponsible';
import styles from './styles.module.css';
import IncidentHandleDepartment from '../IncidentHandleDepartment/IncidentHandleDepartment';
import { shallowEqual, useSelector } from 'react-redux';

export default memo(function IncidentWorkButton({ onClick, handleOpenModal }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [fullName, setFullName] = useState('');
  useLayoutEffect(() => {
    setFullName(`${user.name1} ${user.name2} ${user.name3}`);
  }, [user]);
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

  const currentIncident = useSelector(
    (state) => state.incidents.current.incident,
    shallowEqual,
  );
  useLayoutEffect(() => {
    // console.log('currentIncident', currentIncident);
  }, [currentIncident]);
  const handleInWork = useMemo(() => {
    let { category, property, option } = currentIncident;
    if (category || property || option) {
      if (category.level) {
        return onClick.bind(null, {
          bodyData: { currentResponsible: user.number },
          comment: `${fullName} назначил себя ответственный. Ожидает согласования.`,
          isConsent: true,
        });
      } else {
        return onClick.bind(null, {
          bodyData: { currentResponsible: user.number },
          comment: `Статус инцидента изменен на "В работе". Ответственным назначен: ${fullName}`,
        });
      }
    }
  }, [currentIncident, fullName, onClick, user.number]);

  const responsibleButton = useMemo(() => {
    if (
      Number(currentIncident.statusId) > 0 &&
      !!currentIncident.currentResponsible
    ) {
      return (
        <>
          <Button variant="outline-primary" onClick={handleOpenModal}>
            Изменить
          </Button>
        </>
      );
    } else {
      if (!currentIncident.currentResponsible) {
        return (
          <>
            <Button variant="outline-success" onClick={handleInWork}>
              Взять в работу
            </Button>
          </>
        );
      } else {
        if (user.position.level)
          return (
            <>
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="success"
                  onClick={onClick.bind(null, {
                    comment: `Согласовано`,
                  })}
                >
                  Согласовать
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={onClick.bind(null, {
                    comment: `Отказано`,
                    bodyData: { currentResponsible: null, statusId: 0 },
                  })}
                >
                  Отказать
                </Button>
              </ButtonGroup>
            </>
          );
      }
    }
  }, [
    currentIncident,
    handleInWork,
    handleOpenModal,
    onClick,
    user.position.level,
  ]);
  return (
    <>
      <hr />
      <div className={styles.bar}>
        <div>
          {user.position.level ? (
            <>
              <Button
                variant={'outline-secondary'}
                size="sm"
                onClick={handleShowResponsible}
                className={'m-1'}
              >
                Назначить ответственного
              </Button>
              {showHanldeResponsible ? (
                <SetResponsible
                  show={showHanldeResponsible}
                  onHide={handleCloseResponsible}
                  onClick={onClick}
                />
              ) : undefined}
            </>
          ) : null}

          <Button
            variant={'outline-secondary'}
            size="sm"
            className={'m-1'}
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
        </div>
        {responsibleButton}
      </div>
    </>
  );
});
