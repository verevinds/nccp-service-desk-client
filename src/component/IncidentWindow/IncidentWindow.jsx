import React, { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Moment from 'react-moment';
import dateNow from '../../js/dateNow';
import 'moment/locale/ru';
import IncidentHandleStatus from '../IncidentHandleStatus/IncidentHandleStatus';

import IncidentWindowHeader from '../IncidentWindowHeader/IncidentWindowHeader';
//ActionCreator
import { incidentCreate } from '../../redux/actionCreators/incidentAction';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
// Bootstrap
import { Container, Card } from 'react-bootstrap';
import IncidentWindowBody from '../IncidentWindowBody/IncidentWindowBody';
import { IncidentWindowContext } from './IncidentWindowContext';
import IncidentHandleVise from '../IncidentHandleVise/IncidentHandleVise';

const IncidentWindow = () => {
  const [inWork, setInWork] = useState(false);
  const incident = useSelector((state) => state.incidents?.current.incident, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = function () {
    if (this?.inWork) {
      setInWork(true);
      console.log(this?.inWork);
    }
    setShow(true);
  };
  const onClick = useCallback(
    function () {
      let incidentData = {
        startWork: dateNow(),
        statusId: Number(1),
      };
      if (!!this.incidentData) incidentData = this.incidentData;

      const commentData = {
        text: this.comment,
        userNumber: user.number,
        incidentId: incident.id,
      };

      const matchHandle = {
        route: 'matches',
        ...this.matchHandle,
      };

      if (this.matchCode) {
        incidentData.startWork = null;
        incidentData.statusId = 0;
        dispatch(queryApi(matchHandle));
      }

      dispatch(queryApi(matchHandle));

      dispatch(
        queryApi({
          route: 'incidents',
          method: 'put',
          data: incidentData,
          id: incident.id,
        }),
      );

      dispatch(
        queryApi({
          route: 'comments',
          method: 'post',
          actionUpdate: incidentCreate,
          data: commentData,
          id: incident.id,
        }),
      );
    },
    [user, dispatch, incident, inWork],
  );
  const [vise, setVise] = useState(false);
  if (!!incident) {
    return (
      <IncidentWindowContext.Provider value={{ onClick, handleVise: { vise, setVise } }}>
        {show ? <IncidentHandleStatus show={show} onHide={handleClose} incident={incident} inWork={inWork} /> : null}
        {vise ? <IncidentHandleVise /> : undefined}
        <Container>
          <Card>
            <IncidentWindowHeader />

            <IncidentWindowBody handleOpen={handleOpen} />
            <Card.Footer className="text-right">
              <small>
                <i>
                  <b>Создан:</b>{' '}
                  <Moment locale="ru" fromNow>
                    {incident.createdAt}
                  </Moment>
                </i>
                {' | '}
                <i>
                  <b>Последнее обновление:</b>{' '}
                  <Moment locale="ru" fromNow>
                    {incident.updatedAt}
                  </Moment>
                </i>
              </small>
            </Card.Footer>
          </Card>
        </Container>
      </IncidentWindowContext.Provider>
    );
  } else {
    return <h2>Выберите заявку</h2>;
  }
};

export default memo(IncidentWindow);
