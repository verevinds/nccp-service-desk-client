import React, { memo, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { IState, TDepartment, TPropertyParam } from '../../interface';
import { useSelector } from 'react-redux';

export interface IConstructorInput {
  input: TPropertyParam;
  id: string;
  onChange?: (id: string, input: TPropertyParam, value: any) => void;
  parentValue?: any;
}

const ConstructorInput: React.FC<IConstructorInput> = ({ input, id, onChange, parentValue }) => {
  let formControl;
  console.log('parentValue', parentValue);
  const [state, setState] = useState<string | undefined>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean | undefined>(false);
  const department: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const onSwitchAction = () => {
    setIsSwitchOn(!Boolean(isSwitchOn));
    onChange && onChange(id, input, !Boolean(isSwitchOn));
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
    onChange && onChange(id, input, event.currentTarget.value);
  };

  switch (input.type) {
    case 'tel':
      formControl = (
        <div key={`sf-${id}`}>
          <Form.Control
            type={input.type}
            placeholder={input.placeholder}
            key={`f-${id}`}
            required={!!input.required}
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
          id={id}
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
        <Form.Control
          as="select"
          onChange={handleChange}
          required={!!input.required}
          disabled={!!parentValue}
          defaultValue=""
        >
          <option disabled value="">
            Выберите отдел
          </option>
          {department
            .filter((item: TDepartment) => item.name !== 'НЕ ИСПОЛЬЗОВАТЬ')
            .map((item: TDepartment, index: number) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
        </Form.Control>
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
            onChange={handleChange}
            disabled={!!parentValue}
            key={`dfg-${id}`}
          />

          {!!input.description ? <Form.Text className="text-muted">{input.description}</Form.Text> : undefined}
        </div>
      );
  }

  return (
    <Form.Group controlId={id} key={id} style={{ width: '100%' }}>
      {!!input.title ? (
        <Form.Label>{input.type === 'title' ? <b>{input.title}</b> : input.title}</Form.Label>
      ) : undefined}
      {formControl}
    </Form.Group>
  );
};

export default memo(ConstructorInput);
