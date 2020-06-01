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
  const isUpdate = useSelector(
    (state) => state.positions.isUpdate,
    shallowEqual,
  );
  const list = useSelector((state) => state.positions.list, shallowEqual);
  const [route] = useState('positions');

  useLayoutEffect(() => {
    if (!list.length || isUpdate)
      dispatch(
        queryApi({
          actionSuccessed: positionsRequestSeccessed,
          route,
        }),
      );
  }, [isUpdate, dispatch, route, list]);

  const onFavorites = useCallback(
    ({ list }) => ({ id }) => {
      dispatch(
        queryApi({
          id,
          actionUpdate: positionsUpdate,
          route,
          method: 'put',
          data: {
            level: Number(!list.find((item) => item.id === id).level),
          },
        }),
      );
    },
    [dispatch, route],
  );
  return (
    <>
      <h2>Должности</h2>
      <List list={list} onFavorites={onFavorites({ list })} xs={12} />
    </>
  );
};

export default memo(SettingPositions);
