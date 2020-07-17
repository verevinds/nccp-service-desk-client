import React, { memo, Fragment, useContext, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { AppContext } from '../../AppContext';
import { incidentChoose } from '../../redux/actionCreators/incidentAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faHandshakeSlash } from '@fortawesome/free-solid-svg-icons';
import { IApi } from '../../js/api';
import { IState } from '../../interface';

const HandleAllowToCreate = () => {
  const { apiDispatch } = useContext(AppContext);
  const numberUser = useSelector((state: IState) => state.auth.user.number);
  const incidentId = useSelector((state: IState) => state.incidents.current.incident.id);
  const dispatch = useDispatch();

  const onClick = useCallback(
    function (this: IApi) {
      const comments = this.comments(numberUser, incidentId);

      return {
        ok: () => {
          comments.post({ data: { text: `Создание заявки согласовано` } });
          this.incidents().post({
            data: {
              allowToCreate: true,
              allowToCreateWork: new Date(),
              receiveAt: new Date(),
              startWork: null,
              statusId: 0,
            },
          });

          dispatch(incidentChoose(undefined));
        },
        no: () => {
          comments.post({ data: { text: `Отказано` } });
          this.incidents().post({ data: { statusId: 8388604 } });

          dispatch(incidentChoose(undefined));
        },
      };
    },
    [dispatch, incidentId, numberUser],
  );

  return (
    <Fragment>
      <hr />
      <div className={styles.bar}>
        <ButtonGroup>
          <Button variant={'outline-success'} onClick={() => onClick.call(apiDispatch).ok()} size="sm">
            <FontAwesomeIcon icon={faHandshake} className="mr-1" />
            Согласовать создание
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

export default memo(HandleAllowToCreate);
