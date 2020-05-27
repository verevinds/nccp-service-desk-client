import React, { memo, useLayoutEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import {
  positionsRequestSeccessed,
  positionsUpdate,
} from '../../redux/actionCreators/positionAction';
import List from '../ListAnother/List';
import FilterQuery from '../FilterQuery/FilterQuery';

const SettingPositions = (props) => {
  const dispatch = useDispatch();
  const isUpdate = useSelector(
    (state) => state.positions.isUpdate,
    shallowEqual,
  );
  const list = useSelector((state) => state.positions.list, shallowEqual);
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
    [list, dispatch, route],
  );
  return (
    <>
      <h2>Должности</h2>
      <FilterQuery
        actionSuccessed={positionsRequestSeccessed}
        route={route}
        noFetchVoid
      />
      <List list={list} onFavorites={onFavorites} />
    </>
  );
};

export default memo(SettingPositions);
