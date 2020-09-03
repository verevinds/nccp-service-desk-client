import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGroups, IState } from 'src/interface';
import { findById } from 'src/js/supportingFunction';
import { groupRequestSuccessed, groupUpdate } from 'src/redux/actionCreators/groupAction';
import { queryApi } from 'src/redux/actionCreators/queryApiAction';
import List from '../List/List';
import { TFn } from '../SettingCatalog/SettingCatalog';

export interface ISettingGroup {}

const SettingGroup: React.FC<ISettingGroup> = () => {
  const route = 'groups';
  const dispatch = useDispatch();
  const { list, isUpdate }: IGroups = useSelector((state: IState) => state.groups);
  const handleGroup = React.useCallback(() => {
    return {
      add({ id, value }: TFn) {
        dispatch(
          queryApi({
            route,
            method: 'post',
            data: { name: value },
            actionUpdate: groupUpdate,
          }),
        );
      },
      delete({ id, value }: TFn) {
        dispatch(
          queryApi({
            route,
            method: 'delete',
            actionUpdate: groupUpdate,
            id,
          }),
        );
      },
      archive({ id, value }: TFn) {
        dispatch(
          queryApi({
            route,
            method: 'put',
            actionUpdate: groupUpdate,
            data: { isArchive: Number(!findById(list, id)?.isArchive) },
            id,
          }),
        );
      },
    };
  }, [route, dispatch, list]);

  React.useLayoutEffect(() => {
    dispatch(
      queryApi({
        route,
        actionSuccessed: groupRequestSuccessed,
      }),
    );
  }, [route, dispatch, isUpdate]);
  return (
    <>
      <h2>Группы</h2>
      <List
        list={list}
        onSubmit={handleGroup().add}
        onDelete={handleGroup().delete}
        onArchive={handleGroup().archive}
      />
    </>
  );
};

export default React.memo(SettingGroup);
