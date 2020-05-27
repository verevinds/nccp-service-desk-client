import React, { memo } from 'react';
import List from '../ListAnother/List';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { statusUpdate } from '../../redux/actionCreators/statusAction';

import { Col } from 'react-bootstrap';

const SettingStatus = (props) => {
  const { list } = useSelector((state) => state.status, shallowEqual);
  const dispatch = useDispatch();
  const route = 'status';
  const actionUpdate = statusUpdate;
  //! Определить функцию обработки события
  // Define function handle submit
  const onSubmit = (event, value) => {
    event.preventDefault();
    if (value) {
      const data = { name: value };
      dispatch(
        queryApi({
          method: 'post',
          route,
          actionUpdate,
          data,
        }),
      );
    }
  };
  const onDelete = (id) => {
    dispatch(
      queryApi({
        method: 'delete',
        actionUpdate,
        route,
        id,
      }),
    );
  };

  return (
    <Col>
      <h2>Статус</h2>
      <List list={list} onSubmit={onSubmit} onDelete={onDelete} xs={5} />
    </Col>
  );
};

export default memo(SettingStatus);
