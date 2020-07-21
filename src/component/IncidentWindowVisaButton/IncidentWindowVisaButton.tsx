import React, { memo, Fragment, useContext, useCallback } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { AppContext } from '../../AppContext';
import { incidentChoose } from '../../redux/actionCreators/incidentAction';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { IState, TUser, TIncident } from '../../interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHandshakeSlash, faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { IApi } from '../../js/api';
export interface IVisaIncidentButton {}

const VisaIncidentButton: React.FC<IVisaIncidentButton> = (props) => {
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const incident: TIncident = useSelector((state: IState) => state.incidents.current.incident);
  const { apiDispatch } = useContext(AppContext);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [comment, setComment] = useState('');
  const onClick = useCallback(
    function (this: IApi) {
      const comments = this.comments(user.number, incident.id);

      return {
        ok: () => {
          comments.post({ data: { text: `Cогласовано` } });

          dispatch(
            queryApi({
              route: 'ruleslists/isvisa',
              method: 'put',
              data: {
                positionId: user.positionId,
                userNumber: user.number,
                incidentId: incident.id,
                hasVisa: true,
                hasVisaAt: new Date(),
              },
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

            comments.post({ data: { text: `Заявка переведена в статус "На доработке". Указания: ${comment}` } });
            this.incidents().put(incident.id, { data: { statusId: 8388605 } });

            setShow(false);
            dispatch(incidentChoose(undefined));
          }
          setValidated(true);
        },
        no: () => {
          comments.post({ data: { text: `Отказано` } });
          this.incidents().put(incident.id, { data: { statusId: 8388604 } });

          dispatch(incidentChoose(undefined));
        },
      };
    },
    [comment, dispatch, incident.id, user],
  );

  return (
    <Fragment>
      <ModalWindow
        title="Указать комментарий"
        show={show}
        onHide={() => setShow(false)}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => onClick.call(apiDispatch).modify(event)}
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
          <Button variant={'outline-success'} onClick={() => onClick.call(apiDispatch).ok()} size="sm">
            <FontAwesomeIcon icon={faHandshake} className="mr-1" />
            Согласовать
          </Button>
          <Button variant={'outline-secondary'} onClick={() => setShow(true)} size="sm">
            <FontAwesomeIcon icon={faHighlighter} className="mr-1" />
            На доработку
          </Button>
          <Button variant={'outline-danger'} onClick={() => onClick.call(apiDispatch).no()} size="sm">
            <FontAwesomeIcon icon={faHandshakeSlash} className="mr-1" />
            Отказать
          </Button>
        </ButtonGroup>
      </div>
    </Fragment>
  );
};

export default memo(VisaIncidentButton);
