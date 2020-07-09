import React, { memo, Fragment, useContext, useCallback } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import styles from './styles.module.css';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import { AppContext, IApi } from '../../AppContext';
import { incidentChoose } from '../../redux/actionCreators/incidentAction';
export interface IHandleAllowToCreate {}

const HandleAllowToCreate: React.FC<IHandleAllowToCreate> = (props) => {
  const { Api } = useContext(AppContext);
  const dispatch = useDispatch();
  const onClick = useCallback(function (this: IApi) {
    return {
      ok: () => {
        this.comments(`Создание заявки согласовано`);
        this.incidents({
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
        this.comments(`Отказано`);
        this.incidents({ data: { statusId: 8388604 } });
        dispatch(incidentChoose(undefined));
      },
    };
  }, []);
  return (
    <Fragment>
      <hr />
      <div className={styles.bar}>
        <ButtonGroup>
          <Button variant={'outline-success'} onClick={() => Api && onClick.call(Api).ok()}>
            Согласовать создание
          </Button>
          <Button variant={'outline-danger'} onClick={() => Api && onClick.call(Api).no()}>
            Отказать
          </Button>
        </ButtonGroup>
      </div>
    </Fragment>
  );
};

export default memo(HandleAllowToCreate);
