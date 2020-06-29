import React, { memo, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { IState, TDepartment, IUserInUsers } from '../../interface';
import { ConstructorInputChangeContext } from '../ConstructorInputChange/ConstructorInputChangeContext';
export interface IConstructorInputChangeSelect {}

const ConstructorInputChangeSelect: React.FC<IConstructorInputChangeSelect> = () => {
  const { input } = useContext(ConstructorInputChangeContext);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const users: IUserInUsers[] = useSelector((state: IState) => state.users.list);
  return (
    <Fragment>
      <Form.Control as="select" defaultValue="Выберите..." readOnly>
        <option value="">
          {input.select === 'departments' && 'Выберите отдел'}
          {input.select === 'users' && 'Выберите сотрудника'}
        </option>
        {input.select === 'departments' &&
          department
            .filter((item: TDepartment) => item.name !== 'НЕ ИСПОЛЬЗОВАТЬ')
            .map((item: TDepartment, index: number) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
        {input.select === 'users' &&
          users.map((item: IUserInUsers, index: number) => (
            <option value={`${item.name1} ${item.name2} ${item.name3}`} key={index}>
              {`${item.name1} ${item.name2} ${item.name3}`}
            </option>
          ))}
      </Form.Control>
    </Fragment>
  );
};

export default memo(ConstructorInputChangeSelect);
