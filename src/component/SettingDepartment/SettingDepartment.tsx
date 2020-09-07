import * as React from 'react';
import { IState, TAccess, TDepartment, TUser } from 'src/interface';
import List from '../List/List';
import CardUser from '../CardUser/CardUser';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
export interface ISettingDepartment {}

const SettingDepartment: React.FC<ISettingDepartment> = () => {
  const [chooseDepartment, setChooseDepartment] = React.useState<number | undefined>();
  const [chooseUser, setChooseUser] = React.useState<number | undefined>();
  const {
    catalog: { department },
    users: { list: users },
  }: IState = useSelector((state) => state);

  const onClick = (id) => {
    setChooseDepartment(id);
  };
  return (
    <>
      <h1>Отделы</h1>
      <Row>
        <List
          list={department.filter((item: TDepartment) => item.parent !== 0)}
          onClick={onClick}
        />
        {chooseDepartment ? (
          <List
            xs={3}
            list={users
              .filter((user: TUser) => user.departmentId === chooseDepartment && user.fired === 0)
              .map((user: TUser) => {
                let isBoss = false;
                user.accesses.forEach((access: any) => {
                  if (access.access === 1) isBoss = true;
                });
                if (isBoss) return { ...user, level: 1 };
                return user;
              })}
            onClick={(id) => setChooseUser(id)}
          />
        ) : undefined}
        {chooseUser ? (
          <Col xs={6}>
            <CardUser id={chooseUser} />
          </Col>
        ) : undefined}
      </Row>
    </>
  );
};

export default React.memo(SettingDepartment);
