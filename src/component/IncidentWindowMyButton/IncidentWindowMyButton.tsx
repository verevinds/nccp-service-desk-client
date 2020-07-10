import React, { memo, Fragment, useContext, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { IState } from '../../interface';
import { AppContext, IApi } from '../../AppContext';
export interface IIncidentWindowMyButton {}

const IncidentWindowMyButton: React.FC<IIncidentWindowMyButton> = (props) => {
  const { handleModify, handleOpen } = useContext(IncidentWindowContext);
  const { Api } = useContext(AppContext);
  const {
    name1,
    name2,
    name3,
    number,
    position: { level },
  } = useSelector((state: IState) => state.auth.user);
  const incident = useSelector((state: IState) => state.incidents.current.incident);
  const { category, property, option, currentResponsible, statusId, matches, userNumber } = useSelector(
    (state: IState) => state.incidents.current.incident,
  );

  const fullName = useMemo(() => `${name1} ${name2} ${name3}`, []);

  const onClick = useCallback(
    function (this: IApi) {
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
            commentText = `Заявка переведена в статус "В работе". Ответственным назначен: ${fullName}`;
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
  return (
    <div className="flex flex_end">
      {statusId !== 8388605 ? undefined : (
        <ButtonGroup aria-label="Basic example">
          <Button onClick={() => handleModify.setIsModify(true)} size="sm">
            Доработать
          </Button>
        </ButtonGroup>
      )}

      {Number(statusId) === 8388607 && userNumber === number ? (
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary" size="sm" onClick={() => Api && onClick.call(Api).closeWork()}>
            Закрыть
          </Button>
          <Button onClick={() => handleOpen().inWork()} size="sm">
            Вернуть в работу
          </Button>
        </ButtonGroup>
      ) : undefined}
    </div>
  );
};

export default memo(IncidentWindowMyButton);
