import React, { memo, useContext, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { IState, TIncident } from '../../interface';
import { AppContext } from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUndo } from '@fortawesome/free-solid-svg-icons';
import { IApi } from '../../js/api';
export interface IIncidentWindowMyButton {}

const IncidentWindowMyButton: React.FC<IIncidentWindowMyButton> = (props) => {
  const { handleModify, handleOpen } = useContext(IncidentWindowContext);
  const { apiDispatch } = useContext(AppContext);
  const { name1, name2, name3, number } = useSelector((state: IState) => state.auth.user);
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const { category, property, option, statusId, userNumber } = useSelector(
    (state: IState) => state.incidents.current.incident,
  );

  const fullName = useMemo(() => `${name1} ${name2} ${name3}`, [name1, name2, name3]);

  const onClick = useCallback(
    function (this: IApi) {
      const comments = this.comments(number, incident.id);
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
          this.incidents().put(incident.id, { data: { ...incidentData } });
          if (match) this.matches().post(match);
        },

        closeWork: () => {
          comments.post({ data: { text: `Заявка закрыта.` } });
          this.incidents().put(incident.id, { data: { statusId: 8388608, closeWork: new Date().toISOString() } });
        },
      };
    },
    [category, fullName, incident, number, option, property],
  );
  return (
    <div className="flex flex_end">
      {statusId !== 8388605 ? undefined : (
        <ButtonGroup aria-label="Basic example">
          <Button onClick={() => handleModify.setIsModify(true)} size="sm">
            <FontAwesomeIcon icon={faEdit} />
            Доработать
          </Button>
        </ButtonGroup>
      )}

      {Number(statusId) === 8388607 && userNumber === number ? (
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary" size="sm" onClick={() => onClick.call(apiDispatch).closeWork()}>
            Закрыть
          </Button>
          <Button onClick={() => handleOpen().inWork()} size="sm">
            <FontAwesomeIcon icon={faUndo} className="mr-1" />
            Вернуть в работу
          </Button>
        </ButtonGroup>
      ) : undefined}
    </div>
  );
};

export default memo(IncidentWindowMyButton);
