import React, { memo, useLayoutEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import {
  positionsRequestSeccessed,
  positionsUpdate,
} from '../../redux/actionCreators/positionAction';
import List from '../List/List';

const SettingPositions = (props) => {
  const dispatch = useDispatch();
  const { list, isUpdate } = useSelector(
    (state) => state.positions,
    shallowEqual,
  );
  const [route] = useState('positions');
  useLayoutEffect(() => {
    dispatch(
      queryApi({
        actionSuccessed: positionsRequestSeccessed,
        route,
      }),
    );
  }, [isUpdate, dispatch, route]);
  const onFavorites = useCallback(
    (id) => {
      console.log(list.find((item) => item.id === id).level);
      dispatch(
        queryApi({
          id,
          actionUpdate: positionsUpdate,
          route,
          method: 'put',
          data: { level: Number(!list.find((item) => item.id === id).level) },
        }),
      );
    },
    [list, dispatch, route],
  );
  return (
    <>
      <h2>Должности</h2>
      <List list={list} onFavorites={onFavorites} />
    </>
  );
};

export default memo(SettingPositions);
