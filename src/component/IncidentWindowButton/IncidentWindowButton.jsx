import React, { memo, useState, useMemo, useContext } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styles from './styles.module.css';
import { shallowEqual, useSelector } from 'react-redux';
import HandleMatches from './HandleMatches';
import HandleResponsible from './HandleResponsible';
import HandleDepartment from './HandleDepartment';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import HandleVise from './HandleVise';

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
            <DropdownButton as={ButtonGroup} title={'Дополнительные действия'} variant={'info'}>
              {level ? (
                <Dropdown.Item eventKey="1">
                  <HandleResponsible />
                </Dropdown.Item>
              ) : undefined}
              <Dropdown.Item eventKey="2">
                <HandleDepartment />
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <HandleVise />
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
        {mainButton}
      </div>
    </>
  );
};

export default memo(IncidentWindowButton);
