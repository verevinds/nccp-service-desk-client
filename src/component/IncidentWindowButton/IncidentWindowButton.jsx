import React, { memo, useState, useMemo, useContext } from 'react';
import { Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { shallowEqual, useSelector } from 'react-redux';
import HandleMatches from './HandleMatches';
import HandleResponsible from './HandleResponsible';
import HandleDepartment from './HandleDepartment';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';

const IncidentWindowButton = ({ handleOpen }) => {
  const { onClick } = useContext(IncidentWindowContext);
  const {
    name1,
    name2,
    name3,
    number,
    position: { level },
  } = useSelector((state) => state.auth.user, shallowEqual);
  const incident = useSelector((state) => state.incidents.current.incident, shallowEqual);
  const { category, property, option, currentResponsible, statusId, matches } = useSelector(
    (state) => state.incidents.current.incident,
    shallowEqual,
  );
  const [fullName] = useState(`${name1} ${name2} ${name3}`);

  const handleInWork = useMemo(() => {
    if ((category && category.level) || (property && property.level) || (option && option.level)) {
      return onClick.bind({
        incidentData: { currentResponsible: number, statusId: 0 },
        comment: `${fullName} назначил себя ответственный. Ожидает согласования.`,
        matchHandle: { method: 'post', data: { code: 1, incidentId: incident.id } },
      });
    } else {
      return onClick.bind({
        incidentData: { currentResponsible: number, statusId: 1, startWork: new Date().toISOString() },
        comment: `Статус заявки изменен на "В работе". Ответственным назначен: ${fullName}`,
      });
    }
  }, [category, option, property, fullName, onClick, number, incident.id]);

  const mainButton = useMemo(() => {
    if (!!currentResponsible) {
      if (Number(statusId) > 0) {
        return (
          <Button variant="outline-primary" onClick={handleOpen}>
            Изменить
          </Button>
        );
      }
    }
    if (!Number(statusId) && !currentResponsible) {
      return (
        <Button variant="outline-success" onClick={handleInWork}>
          Взять в работу
        </Button>
      );
    }
  }, [statusId, currentResponsible, handleInWork, handleOpen]);

  const buttonMatch = useMemo(() => {
    if (!!~matches.findIndex((item) => item.isMatch === false)) {
      return <HandleMatches onClick={onClick} />;
    }
  }, [matches, onClick]);
  return (
    <>
      <hr />
      <div className={styles.bar}>
        <div>
          {!!buttonMatch ? (
            level ? (
              buttonMatch
            ) : undefined
          ) : (
            <>
              {level ? <HandleResponsible onClick={onClick} /> : undefined}
              <HandleDepartment onClick={onClick} />
            </>
          )}
        </div>
        {mainButton}
      </div>
    </>
  );
};

export default memo(IncidentWindowButton);
