import React, { memo, useLayoutEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { positionsRequestSeccessed, positionsUpdate } from '../../redux/actionCreators/positionAction';
import List from '../List/List';
import SettingPositionsResponsibleModal from '../SettingPositionsResponsibleModal/SettingPositionsResponsibleModal';

const SettingPositions = (props) => {
  const dispatch = useDispatch();
  const isUpdate = useSelector((state) => state.positions.isUpdate);
  const list = useSelector((state) => state.positions.list);
  const [route] = useState('positions');
  const [id, setId] = useState(null);
  useLayoutEffect(() => {
    if (!list.length || isUpdate)
      dispatch(
        queryApi({
          actionSuccessed: positionsRequestSeccessed,
          route: 'positions',
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

  const [show, setShow] = useState(false);
  const handleResponsible = useCallback(({ id }) => {
    setShow(true);
    setId(id);
  }, []);

  return (
    <>
      <h2>Должности</h2>
      <SettingPositionsResponsibleModal show={show} setShow={setShow} id={id} />
      <List list={list} onFavorites={onFavorites({ list })} handleResponsible={handleResponsible} xs={12} />
    </>
  );
};

export default memo(SettingPositions);
