import React, { memo, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export interface IConstructorInput {
  input: TConstructorInput;
  key: string;
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
  key,
  onChange,
}) => {
  let formControl;
  // console.group('title', title, description);
  // console.log('placeholder', placeholder);
  // console.log('type', type);
  // console.log('required', !!required);
  // console.groupEnd();
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
      if (type === 'switch') {
        onChange(isSwitchOn);
      } else {
        onChange(state);
      }
    }
  }, [state, isSwitchOn, onChange, type]);

  switch (type) {
    case 'tel':
      formControl = (
        <div key={`sf-${key}`}>
          <Form.Control
            type={type}
            placeholder={placeholder}
            key={`f-${key}`}
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
            id="customSwitch1"
            defaultChecked={!!isSwitchOn}
            required={!!required}
          />
          <label className="custom-control-label pointer" htmlFor="customSwitch1" onClick={onSwitchAction}>
            {description}
          </label>
        </div>
      );
      break;
    case 'checkbox':
      formControl = (
        <Form.Check
          type={type}
          id={key}
          label={description}
          defaultChecked={!!isSwitchOn}
          onChange={onSwitchAction}
          required={!!required}
          key={`c-${key}`}
        />
      );
      break;
    default:
      formControl = (
        <div key={`fdg-${key}`}>
          <Form.Control
            type={type}
            placeholder={placeholder}
            required={!!required}
            value={state}
            onChange={handleChange}
            key={`dfg-${key}`}
          />

          {!!description ? <Form.Text className="text-muted">{description}</Form.Text> : undefined}
        </div>
      );
  }

  return (
    <Form.Group controlId={key} key={key} style={{ width: '100%' }}>
      {!!title ? <Form.Label>{title}</Form.Label> : undefined}
      {formControl}
    </Form.Group>
  );
};

export default memo(ConstructorInput);
