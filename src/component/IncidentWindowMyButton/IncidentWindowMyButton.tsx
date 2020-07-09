import React, { memo, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { IState } from '../../interface';
export interface IIncidentWindowMyButton {}

const IncidentWindowMyButton: React.FC<IIncidentWindowMyButton> = (props) => {
  const { handleModify } = useContext(IncidentWindowContext);
  const { category, property, option, currentResponsible, statusId, matches, userNumber } = useSelector(
    (state: IState) => state.incidents.current.incident,
  );
  return (
    <Fragment>
      {statusId !== 8388605 ? undefined : (
        <ButtonGroup aria-label="Basic example">
          <Button onClick={() => handleModify.setIsModify(true)}>Доработать</Button>
        </ButtonGroup>
      )}
    </Fragment>
  );
};

export default memo(IncidentWindowMyButton);
