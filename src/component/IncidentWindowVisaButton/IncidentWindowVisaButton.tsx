import React, { memo, Fragment, useContext, useCallback } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton, Form } from 'react-bootstrap';
import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';

import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { AppContext, IApi } from '../../AppContext';
import { incidentChoose, incidentCreate } from '../../redux/actionCreators/incidentAction';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { queries } from '@testing-library/react';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { IState, TUser, TIncident } from '../../interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHandshakeSlash, faHighlighter } from '@fortawesome/free-solid-svg-icons';
export interface IVisaIncidentButton {}

const VisaIncidentButton: React.FC<IVisaIncidentButton> = (props) => {
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const { Api } = useContext(AppContext);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [comment, setComment] = useState('');
  const onClick = useCallback(
    function (this: IApi) {
      return {
        ok: () => {
          this.comments(`Cогласовано`);
          dispatch(
            queryApi({
              route: 'ruleslists/isvisa',
              method: 'put',
              data: { positionId: user.positionId, incidentId: incident.id, hasVisa: true, hasVisaAt: new Date() },
            }),
          );
          dispatch(incidentChoose(undefined));
        },
        modify: (event: React.FormEvent<HTMLFormElement>) => {
          const form = event.currentTarget;
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault();
            this.comments(`Заявка переведена в статус "На доработке". Указания: ${comment}`);
            this.incidents({ data: { statusId: 8388605 } });
            setShow(false);
            dispatch(incidentChoose(undefined));
          }
          setValidated(true);
        },
        no: () => {
          this.comments(`Отказано`);
          this.incidents({ data: { statusId: 8388604 } });
          dispatch(incidentChoose(undefined));
        },
      };
    },
    [comment],
  );

  return (
    <Fragment>
      <ModalWindow
        title="Указать комментарий"
        show={show}
        onHide={() => setShow(false)}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => Api && onClick.call(Api).modify(event)}
        validated={validated}
        textOk="Отправить"
      >
        <>
          <Form.Control
            value={comment}
            required
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setComment(event.currentTarget.value);
            }}
          />
        </>
      </ModalWindow>
      <hr />
      <div className="flex flex_end">
        <ButtonGroup>
          <Button variant={'outline-success'} onClick={() => Api && onClick.call(Api).ok()} size="sm">
            <FontAwesomeIcon icon={faHandshake} className="mr-1" />
            Согласовать
          </Button>
          <Button variant={'outline-secondary'} onClick={() => setShow(true)} size="sm">
            <FontAwesomeIcon icon={faHighlighter} className="mr-1" />
            На доработку
          </Button>
          <Button variant={'outline-danger'} onClick={() => Api && onClick.call(Api).no()} size="sm">
            <FontAwesomeIcon icon={faHandshakeSlash} className="mr-1" />
            Отказать
          </Button>
        </ButtonGroup>
      </div>
    </Fragment>
  );
};

export default memo(VisaIncidentButton);
