import React, { memo, useState, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { IState, TDepartment, TPropertyParam, IUserInUsers, TUser } from '../../interface';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

export interface IConstructorInput {
  input: TPropertyParam;
  id: string;
  onChange?: (input: TPropertyParam, value: any, indexRow?: number, indexCol?: number) => void;
  parentValue?: any;
  indexRow?: number;
  indexCol?: number;
  count?: any;
  setCount?: any;
}

const ConstructorInput: React.FC<IConstructorInput> = ({ input, id, onChange, parentValue, indexRow, indexCol }) => {
  let formControl;
  const [state, setState] = useState<string | undefined>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean | undefined>(false);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const users: IUserInUsers[] = useSelector((state: IState) => state.users.list);
  const user: TUser = useSelector((state: IState) => state.auth.user);

  const usersHandled = useMemo(() => {
    if (users) {
      return users.filter((item: IUserInUsers) => item.departmentId === user.departmentId);
    }
    return users;
  }, [users]);

  const onSwitchAction = () => {
    setIsSwitchOn(!Boolean(isSwitchOn));
    onChange && onChange(input, !Boolean(isSwitchOn), indexRow, indexCol);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
    onChange && onChange(input, event.currentTarget.value, indexRow, indexCol);
  };

  switch (input.type) {
    case 'void':
      formControl = <div key={`void-${id}`} className={styles.void}></div>;
      break;
    case 'tel':
      formControl = (
        <div key={`sf-${id}`}>
          <Form.Control
            type={input.type}
            placeholder={input.placeholder}
            className={styles.input}
            key={`f-${id}`}
            // required={!!input.required}
            pattern="/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/"
            value={state}
            onChange={handleChange}
            disabled={!!parentValue}
          />

          <Form.Text className="text-muted">Введите номер телефона в формате: +7(903)888-88-88</Form.Text>
        </div>
      );
      break;
    case 'switch':
      formControl = (
        <div className="custom-control custom-switch ">
          <input
            type="checkbox"
            className="custom-control-input pointer"
            id={`customSwitch${id}`}
            defaultChecked={!!isSwitchOn}
            required={!!input.required}
            disabled={!!parentValue}
          />
          <label className="custom-control-label pointer" htmlFor={`customSwitch${id}`} onClick={onSwitchAction}>
            {input.placeholder}
          </label>
        </div>
      );
      break;
    case 'checkbox':
      formControl = (
        <Form.Check
          type={input.type}
          id={`c-${id}`}
          label={input.placeholder}
          defaultChecked={!!isSwitchOn}
          onChange={onSwitchAction}
          required={!!input.required}
          key={`c-${id}`}
          disabled={!!parentValue}
        />
      );
      break;
    case 'title':
      formControl = (
        <div key={`fdg-${id}`}>
          {!!input.description ? <Form.Text className="text-muted">{input.description}</Form.Text> : undefined}
        </div>
      );
      break;

    case 'list':
      formControl = (
        <div key={`select-${id}`}>
          <Form.Control
            as="select"
            onChange={handleChange}
            required={!!input.required}
            disabled={!!parentValue}
            className={styles.input}
            defaultValue={''}
          >
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
            {usersHandled &&
              usersHandled.map((item: IUserInUsers, index: number) => (
                <option value={`${item.name1} ${item.name2} ${item.name3}`} key={index}>
                  {`${item.name1} ${item.name2} ${item.name3}`}
                </option>
              ))}
          </Form.Control>
          {!!input.description ? <Form.Text className="text-muted">{input.description}</Form.Text> : undefined}
        </div>
      );
      break;
    default:
      formControl = (
        <div key={`fdg-${id}`}>
          <Form.Control
            type={input.type}
            placeholder={input.placeholder}
            required={!!input.required}
            value={state}
            className={styles.input}
            onChange={handleChange}
            disabled={!!parentValue}
            key={`dfg-${id}`}
          />

          {!!input.description ? <Form.Text className="text-muted">{input.description}</Form.Text> : undefined}
        </div>
      );
  }

  return (
    <Form.Group controlId={id} key={id} className={styles.group}>
      {!!input.title ? (
        <Form.Label className={styles.title}>{input.type === 'title' ? <b>{input.title}</b> : input.title}</Form.Label>
      ) : undefined}
      {formControl}
    </Form.Group>
  );
};

export default memo(ConstructorInput);
