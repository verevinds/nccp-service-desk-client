import React, { memo, useState, useMemo, useContext } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styles from './styles.module.css';
import { shallowEqual, useSelector } from 'react-redux';
import HandleMatches from './HandleMatches';
import HandleResponsible from './HandleResponsible';
import HandleDepartment from './HandleDepartment';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';

const IncidentWindowButton = ({ handleOpen, myIncident }) => {
  const { onClick, handleVise, handleModify } = useContext(
    IncidentWindowContext,
  );
  const {
    name1,
    name2,
    name3,
    number,
    position: { level },
  } = useSelector((state) => state.auth.user, shallowEqual);
  const incident = useSelector(
    (state) => state.incidents.current.incident,
    shallowEqual,
  );
  const {
    category,
    property,
    option,
    currentResponsible,
    statusId,
    matches,
    userNumber,
  } = useSelector((state) => state.incidents.current.incident, shallowEqual);
  const [fullName] = useState(`${name1} ${name2} ${name3}`);

  const handleInWork = useMemo(() => {
    if (
      (category && category.level) ||
      (property && property.level) ||
      (option && option.level)
    ) {
      return onClick.bind({
        incidentData: { currentResponsible: number, statusId: 0 },
        comment: `${fullName} назначил себя ответственный. Ожидает согласования.`,
        matchHandle: {
          method: 'post',
          data: { code: 1, incidentId: incident.id },
        },
      });
    } else {
      return onClick.bind({
        incidentData: {
          currentResponsible: number,
          statusId: 1,
          startWork: new Date().toISOString(),
        },
        comment: `Статус заявки изменен на "В работе". Ответственным назначен: ${fullName}`,
      });
    }
  }, [category, option, property, fullName, onClick, number, incident.id]);

  const mainButton = useMemo(() => {
    if (!!currentResponsible) {
      if (
        Number(statusId) > 0 &&
        Number(statusId) < 8000000 &&
        currentResponsible === number &&
        !myIncident
      ) {
        return (
          <Button variant="outline-primary" onClick={handleOpen}>
            Изменить
          </Button>
        );
      }
      if (
        Number(statusId) === 8388607 &&
        currentResponsible === number &&
        !!myIncident
      ) {
        return (
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="outline-primary"
              onClick={onClick.bind({
                incidentData: {
                  statusId: 8388608,
                  closeWork: new Date().toISOString(),
                },
                comment: `Заявка закрыта.`,
              })}
            >
              Закрыть
            </Button>
            <Button onClick={handleOpen.bind({ inWork: true })}>
              Вернуть в работу
            </Button>
          </ButtonGroup>
        );
      }
      if (
        Number(statusId) === 8388605 &&
        userNumber === number &&
        !!myIncident
      ) {
        return (
          <ButtonGroup aria-label="Basic example">
            <Button onClick={() => handleModify.setIsModify(true)}>
              Доработать
            </Button>
          </ButtonGroup>
        );
      }
    }
    if (!Number(statusId) && !currentResponsible && !myIncident) {
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
          {!!buttonMatch && Number(statusId) < 8000000 && !myIncident ? (
            buttonMatch
          ) : Number(statusId) < 8000000 && !myIncident ? (
            <DropdownButton
              as={ButtonGroup}
              title={'Дополнительные действия'}
              variant={'outline-info'}
            >
              {level ? (
                <Dropdown.Item eventKey="1">
                  <HandleResponsible />
                </Dropdown.Item>
              ) : undefined}
              <Dropdown.Item eventKey="2">
                <HandleDepartment />
              </Dropdown.Item>
              {Number(statusId) > 0 ? (
                <>
                  <Dropdown.Divider />

                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => handleVise.setVise(true)}
                  >
                    Отправить на согласование
                  </Dropdown.Item>
                </>
              ) : undefined}
            </DropdownButton>
          ) : undefined}
        </div>
        {mainButton}
      </div>
    </>
  );
};

export default memo(IncidentWindowButton);
