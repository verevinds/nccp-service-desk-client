import React, { memo, useState, useLayoutEffect, useMemo } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import SetResponsible from '../IncidentHandleResponsible/IncidentHandleResponsible';
import styles from './styles.module.css';
import IncidentHandleDepartment from '../IncidentHandleDepartment/IncidentHandleDepartment';
import { shallowEqual, useSelector } from 'react-redux';
import HandleMatches from './HandleMatches';

export default memo(function IncidentWorkButton({ onClick, handleOpenModal, incident }) {
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

  const currentIncident = useSelector((state) => state.incidents.current.incident, shallowEqual);
  const handleInWork = useMemo(() => {
    let { category, property, option } = currentIncident;
    if ((category && category.level) || (property && property.level) || (option && option.level)) {
      return onClick.bind({
        bodyData: { currentResponsible: user.number },
        comment: `${fullName} назначил себя ответственный. Ожидает согласования.`,
        isConsent: true,
      });
    } else {
      return onClick.bind({
        bodyData: { currentResponsible: user.number },
        comment: `Статус заявки изменен на "В работе". Ответственным назначен: ${fullName}`,
      });
    }
  }, [currentIncident, fullName, onClick, user.number]);

  const responsibleButton = useMemo(() => {
    if (Number(currentIncident.statusId) > 0 && !!currentIncident.currentResponsible) {
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
        if (user.position?.level) return <HandleMatches incident={incident} onClick={onClick} />;
      }
    }
  }, [currentIncident, handleInWork, handleOpenModal, onClick, user.position]);
  return (
    <>
      <hr />
      <div className={styles.bar}>
        <div>
          {user.position?.level ? <></> : null}

          <Button variant={'outline-secondary'} size="sm" className={'m-1'} onClick={handleShowDepartment}>
            Передать в другой отдел
          </Button>
          {showHandleDepartment ? (
            <IncidentHandleDepartment show={showHandleDepartment} onHide={handleCloseDepartment} onClick={onClick} />
          ) : undefined}
        </div>
        {responsibleButton}
      </div>
    </>
  );
});
