import React, { memo, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import List from '../List/List';
import FilterQuery from '../FilterQuery/FilterQuery';
import { usersRequestSeccessed } from '../../redux/actionCreators/usersAction';
import { useSelector, shallowEqual } from 'react-redux';

type TList = {
  id: number;
  name: string;
  createdAt: string;
  noChange: boolean | undefined;
  level: number | undefined;
};
interface ISettingAccessList {
  setId: (id: number) => void;
}
const SettingAccessList: React.FC<ISettingAccessList> = ({ setId }) => {
  const users = useSelector((state: any) => state.users.list, shallowEqual);

  const list = useMemo(() => {
    return users.map((item: any) => {
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
    <Container>
      <h3>Поиск пользователей</h3>
      <FilterQuery
        actionSuccessed={usersRequestSeccessed}
        route="users"
        noFetchVoid
      />
      <List list={list} onClick={setId} />
    </Container>
  );
};

export default memo(SettingAccessList);
