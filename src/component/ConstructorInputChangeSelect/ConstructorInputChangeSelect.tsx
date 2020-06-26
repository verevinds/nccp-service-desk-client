import React, { memo, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { ConstructorInputChangeContext } from '../ConstructorInputChange/ConstructorInputChangeContext';
import { IState, TDepartment } from '../../interface';
export interface IConstructorInputChangeSelect {}

const ConstructorInputChangeSelect: React.FC<IConstructorInputChangeSelect> = () => {
  const { input, handleControl } = useContext(ConstructorInputChangeContext);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  return (
    <Fragment>
      <Form.Control as="select" defaultValue="Выберите..." readOnly>
        <option>Выберите отдел...</option>
        {department
          .filter((item: TDepartment) => item.name !== 'НЕ ИСПОЛЬЗОВАТЬ')
          .map((item: TDepartment, index: number) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
      </Form.Control>
    </Fragment>
  );
};

export default memo(ConstructorInputChangeSelect);
