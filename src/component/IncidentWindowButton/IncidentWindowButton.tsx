import React, { memo, useState, useMemo, useContext, useCallback } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import HandleMatches from './HandleMatches';
import HandleResponsible from './HandleResponsible';
import HandleDepartment from './HandleDepartment';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { AppContext } from '../../AppContext';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IState, TIncident, TMatch } from '../../interface';
import { IApi } from '../../js/api';

interface IIncidentWindowButton {
  myIncident: Boolean;
}

const IncidentWindowButton: React.FC<IIncidentWindowButton> = ({ myIncident }) => {
  const { handleVise, handleOpen } = useContext(IncidentWindowContext);
  const {
    name1,
    name2,
    name3,
    number,
    position: { level },
  } = useSelector((state: IState) => state.auth.user);
  const incident = useSelector((state: IState) => state.incidents.current.incident);
  const { id, category, property, option, currentResponsible, statusId, matches, userNumber }: TIncident = useSelector(
    (state: IState) => state.incidents.current.incident,
  );
  const [fullName] = useState(`${name1} ${name2} ${name3}`);
  const { apiDispatch } = useContext(AppContext);

  const onClick = useCallback(
    function (this: IApi) {
      const comments = this.comments(number, id);
      return {
        inWork: () => {
          let incidentData, commentText, match;
          if (category?.level || property?.level || option?.level) {
            incidentData = { currentResponsible: number, statusId: 0 };
            commentText = `${fullName} назначил себя ответственный. Ожидает согласования.`;
            match = {
              data: { code: 1, incidentId: incident.id },
            };
          } else {
            incidentData = {
              currentResponsible: number,
              statusId: 1,
              startWork: new Date().toISOString(),
            };
            commentText = `Заявка переведена в статус "В работе". Ответственным назначен: ${fullName}`;
          }

          comments.post({ data: { text: commentText } });
          this.incidents().put(id, { data: { ...incidentData } });
          if (match) this.matches().post(match);
        },

        closeWork: () => {
          comments.post({ data: { text: `Заявка закрыта` } });
          this.incidents().put(id, { data: { statusId: 8388608, closeWork: new Date().toISOString() } });
        },
      };
    },
    [category, fullName, incident, number, id, option, property],
  );

  const mainButton = useMemo(() => {
    if (!!currentResponsible) {
      if (Number(statusId) > 0 && Number(statusId) < 8000000 && currentResponsible === number && !myIncident) {
        return (
          <Button variant="outline-primary" size="sm" onClick={handleOpen}>
            <FontAwesomeIcon icon={faPencilAlt} className="mr-1" />
            Изменить
          </Button>
        );
      }
      if (Number(statusId) === 8388607 && userNumber === number && !!myIncident) {
        return (
          <ButtonGroup aria-label="Basic example">
            <Button variant="outline-primary" size="sm" onClick={() => onClick.call(apiDispatch).closeWork()}>
              Закрыть
            </Button>
            <Button onClick={() => handleOpen().inWork()} size="sm">
              Вернуть в работу
            </Button>
          </ButtonGroup>
        );
      }
    }
    if (!Number(statusId) && !currentResponsible && !myIncident) {
      return (
        <Button variant="outline-success" onClick={onClick.call(apiDispatch).inWork} size="sm">
          Взять в работу
        </Button>
      );
    }
  }, [statusId, currentResponsible, handleOpen, myIncident, number, onClick, apiDispatch, userNumber]);

  const buttonMatch = useMemo(() => {
    let isMatches = !!~matches.findIndex((item: TMatch) => item.isMatch === false);
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
            <DropdownButton
              id={`dropdown`}
              as={ButtonGroup}
              title={'Дополнительные действия'}
              variant={'outline-info'}
              size="sm"
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

                  <Dropdown.Item eventKey="2" onClick={() => handleVise && handleVise.setVise(true)}>
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
