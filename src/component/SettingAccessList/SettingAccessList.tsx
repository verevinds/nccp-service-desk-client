import React, {
  memo,
  useMemo,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { Row } from 'react-bootstrap';
import List from '../List/List';
import { usersRequestSeccessed } from '../../redux/actionCreators/usersAction';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { TUser } from '../../interface';

type TList = {
  id: number;
  name: string;
  createdAt: string;
  noChange: boolean | undefined;
  level: number | undefined;
};
interface ISettingAccessList {
  setId: Dispatch<SetStateAction<number | undefined>>;
}
const SettingAccessList: React.FC<ISettingAccessList> = ({ setId }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.list, shallowEqual);
  useLayoutEffect(() => {
    if (!users.length)
      dispatch(
        queryApi({
          route: 'users',
          actionSuccessed: usersRequestSeccessed,
        }),
      );
  }, [users, dispatch]);
  const list = useMemo(() => {
    return users
      .filter((item: TUser) => item.fired !== 1)
      .map((item: any) => {
        return {
          id: item.number,
          name: `${item.name1} ${item.name2} ${item.name3}`,
          createdAt: item.createdAt,
          noChange: false,
          level: item.level || 0,
        };
      });
  }, [users]);

  return (
    <Row>
      <List title={`Поиск пользователей`} list={list} onClick={setId} xs={12} />
    </Row>
  );
};

export default memo(SettingAccessList);
