import React, { memo, useCallback } from 'react';
import List from '../List/List';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { statusUpdate } from '../../redux/actionCreators/statusAction';

import { Col } from 'react-bootstrap';

const SettingStatus = (props) => {
  const { list } = useSelector((state) => state.status, shallowEqual);
  const dispatch = useDispatch();
  const route = 'status';

  const handleEvent = useCallback(
    ({ route, list, fact }) => ({ id, value }) => {
      let data;
      let method = 'put';
      if (value) {
        data = {
          name: value,
        };
      }
      switch (fact) {
        case 'favorites':
          data = {
            level: Number(!list.find((item) => item.id === id).level),
          };
          break;
        case 'archive':
          data = {
            isArchive: Number(!list.find((item) => item.id === id).isArchive),
          };
          break;
        case 'delete':
          method = 'delete';
          break;
        default:
          method = 'post';
          break;
      }

      dispatch(
        queryApi({
          id,
          actionUpdate: statusUpdate,
          route,
          method,
          data,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Col>
      <h2>Статус</h2>
      <List
        list={list}
        onSubmit={handleEvent({ route, list })}
        onDelete={handleEvent({ route, list, fact: 'delete' })}
        onArchive={handleEvent({ route, list, fact: 'archive' })}
        xs={5}
      />
    </Col>
  );
};

export default memo(SettingStatus);
