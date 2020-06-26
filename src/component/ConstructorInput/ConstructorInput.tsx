import React, { memo, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export interface IConstructorInput {
  input: TConstructorInput;
  id: string;
  onChange?: (arg: any) => void;
}
export type TConstructorInput = {
  title?: string;
  placeholder?: string;
  type?: TTypeInput;
  required?: boolean;
  description?: string;
  parent?: string;
};
export type TTypeInput =
  | 'button'
  | 'checkbox'
  | 'password'
  | 'reset'
  | 'text'
  | 'color'
  | 'date'
  | 'datetime'
  | 'datetime-local'
  | 'email'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'month'
  | 'week'
  | 'switch'
  | ''
  | string;
const ConstructorInput: React.FC<IConstructorInput> = ({
  input: { title, placeholder, type, required, description, parent },
  id,
  onChange,
}) => {
  console.log(id);

  let formControl;
  const [state, setState] = useState<string | undefined>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean | undefined>(false);
  const onSwitchAction = () => {
    setIsSwitchOn(!Boolean(isSwitchOn));
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
  };

  useEffect(() => {
    if (onChange) {
      if (type === 'switch' || type === 'checkbox') {
        onChange(isSwitchOn);
      } else {
        onChange(state);
      }
    }
  }, [state, isSwitchOn, onChange, type]);

  switch (type) {
    case 'tel':
      formControl = (
        <div key={`sf-${id}`}>
          <Form.Control
            type={type}
            placeholder={placeholder}
            key={`f-${id}`}
            required={!!required}
            pattern="/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/"
            value={state}
            onChange={handleChange}
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
            required={!!required}
          />
          <label className="custom-control-label pointer" htmlFor={`customSwitch${id}`} onClick={onSwitchAction}>
            {placeholder}
          </label>
        </div>
      );
      break;
    case 'checkbox':
      formControl = (
        <Form.Check
          type={type}
          id={id}
          label={placeholder}
          defaultChecked={!!isSwitchOn}
          onChange={onSwitchAction}
          required={!!required}
          key={`c-${id}`}
        />
      );
      break;
    case 'title':
      formControl = (
        <div key={`fdg-${id}`}>
          {!!description ? <Form.Text className="text-muted">{description}</Form.Text> : undefined}
        </div>
      );
      break;
    default:
      formControl = (
        <div key={`fdg-${id}`}>
          <Form.Control
            type={type}
            placeholder={placeholder}
            required={!!required}
            value={state}
            onChange={handleChange}
            key={`dfg-${id}`}
          />

          {!!description ? <Form.Text className="text-muted">{description}</Form.Text> : undefined}
        </div>
      );
  }

  return (
    <Form.Group controlId={id} key={id} style={{ width: '100%' }}>
      {!!title ? <Form.Label>{type === 'title' ? <b>{title}</b> : title}</Form.Label> : undefined}
      {formControl}
    </Form.Group>
  );
};

export default memo(ConstructorInput);
