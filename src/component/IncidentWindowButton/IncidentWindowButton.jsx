import React, { memo, useState, useMemo, useContext, useCallback } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styles from './styles.module.css';
import { shallowEqual, useSelector } from 'react-redux';
import HandleMatches from './HandleMatches';
import HandleResponsible from './HandleResponsible';
import HandleDepartment from './HandleDepartment';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { AppContext } from '../../AppContext';
import HandleAllowToCreate from '../IncidentWindowDepartmentButton/IncidentWindowDepartmentButton';

const IncidentWindowButton = ({ handleOpen, myIncident }) => {
  const { handleVise, handleModify } = useContext(IncidentWindowContext);
  const {
    name1,
    name2,
    name3,
    number,
    position: { level },
  } = useSelector((state) => state.auth.user, shallowEqual);
  const incident = useSelector((state) => state.incidents.current.incident, shallowEqual);
  const { category, property, option, currentResponsible, statusId, matches, userNumber } = useSelector(
    (state) => state.incidents.current.incident,
    shallowEqual,
  );
  const [fullName] = useState(`${name1} ${name2} ${name3}`);
  const { Api } = useContext(AppContext);

  const onClick = useCallback(
    function () {
      return {
        inWork: () => {
          let incidentData, commentText, match;
          if (category?.level || property?.level || option?.level) {
            incidentData = { currentResponsible: number, statusId: 0 };
            commentText = `${fullName} назначил себя ответственный. Ожидает согласования.`;
            match = {
              method: 'post',
              data: { code: 1, incidentId: incident.id },
            };
          } else {
            incidentData = {
              currentResponsible: number,
              statusId: 1,
              startWork: new Date().toISOString(),
            };
            commentText = `Статус заявки изменен на "В работе". Ответственным назначен: ${fullName}`;
          }

          this.comments(commentText);
          this.incidents({ data: { ...incidentData } });
          this.match({ ...match });
        },

        closeWork: () => {
          this.comments(`Заявка закрыта.`);
          this.incidents({ data: { statusId: 8388608, closeWork: new Date().toISOString() } });
        },
      };
    },
    [category, fullName, incident, number, option, property],
  );

  const mainButton = useMemo(() => {
    if (!!currentResponsible) {
      if (Number(statusId) > 0 && Number(statusId) < 8000000 && currentResponsible === number && !myIncident) {
        return (
          <Button variant="outline-primary" onClick={handleOpen}>
            Изменить
          </Button>
        );
      }
      if (Number(statusId) === 8388607 && userNumber === number && !!myIncident) {
        return (
          <ButtonGroup aria-label="Basic example">
            <Button variant="outline-primary" onClick={() => onClick.call(Api).closeWork()}>
              Закрыть
            </Button>
            <Button onClick={() => handleOpen().inWork()}>Вернуть в работу</Button>
          </ButtonGroup>
        );
      }
    }
    if (!Number(statusId) && !currentResponsible && !myIncident) {
      return (
        <Button variant="outline-success" onClick={onClick.call(Api).inWork}>
          Взять в работу
        </Button>
      );
    }
  }, [statusId, currentResponsible, handleOpen, handleModify, myIncident, number, onClick, Api, userNumber]);

  const buttonMatch = useMemo(() => {
    let isMatches = !!~matches.findIndex((item) => item.isMatch === false);
    if (isMatches) {
      return <HandleMatches />;
    }
  }, [matches]);

  return (
    <>
      <hr />
      <div className={styles.bar}>
        <div>
          {!!buttonMatch && Number(statusId) < 8000000 && !myIncident ? (
            buttonMatch
          ) : Number(statusId) < 8000000 && !myIncident ? (
            <DropdownButton as={ButtonGroup} title={'Дополнительные действия'} variant={'outline-info'}>
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

                  <Dropdown.Item eventKey="2" onClick={() => handleVise.setVise(true)}>
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
