import * as React from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IGroups, IState, TGroup, TGroupList, TUser, TUsers } from 'src/interface';
import { findById } from 'src/js/supportingFunction';
import { groupRequestSuccessed, groupUpdate } from 'src/redux/actionCreators/groupAction';
import { queryApi } from 'src/redux/actionCreators/queryApiAction';
import Dependence from '../Dependence/Dependence';
import List from '../List/List';
import { TFn } from '../SettingCatalog/SettingCatalog';

export interface ISettingGroup {}

const SettingGroup: React.FC<ISettingGroup> = () => {
  const route = 'groups';
  const dispatch = useDispatch();
  const { list, isUpdate }: IGroups = useSelector((state: IState) => state.groups);
  const { list: users }: TUsers = useSelector((state: IState) => state.users);
  const [group, setGroup] = React.useState<TGroup | undefined>();
  const usersModify = React.useMemo(
    () =>
      users
        .filter((user: TUser) => user.fired === 0)
        .map((user: TUser) => ({ ...user, id: user.number })),
    [users],
  );

  React.useEffect(() => {
    if (group) setGroup(list.find((el) => el.id === group.id));
    console.log(list);
  }, [list]);
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
      click(id) {
        setGroup(findById(list, id));
      },
    };
  }, [route, dispatch, list]);

  React.useLayoutEffect(() => {
    console.log(isUpdate);
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
      <Row>
        <List
          list={list}
          onSubmit={handleGroup().add}
          onDelete={handleGroup().delete}
          onArchive={handleGroup().archive}
          onClick={handleGroup().click}
        />
        {group ? (
          <Dependence
            title={group?.name}
            listDependence={group.group_lists.map((el: TGroupList) => ({
              id: el.id,
              idDependence: el.userNumber,
              name: `${el.user.name1} ${el.user.name2} ${el.user.name3}`,
            }))}
            pickList={usersModify}
            handleAdd={(select) => () => {
              dispatch(
                queryApi({
                  route: 'groups/list',
                  method: 'post',
                  data: {
                    groupId: group.id,
                    userNumber: select,
                  },
                  actionUpdate: groupUpdate,
                }),
              );
            }}
            handleDelete={(id) => () => {
              dispatch(
                queryApi({
                  route: 'groups/list',
                  method: 'delete',
                  id,
                  actionUpdate: groupUpdate,
                }),
              );
            }}
          />
        ) : undefined}
      </Row>
    </>
  );
};

export default React.memo(SettingGroup);
