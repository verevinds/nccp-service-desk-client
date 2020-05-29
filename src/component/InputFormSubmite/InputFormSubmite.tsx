import React, { memo, useState } from 'react';

//? Bootstrap
import { InputGroup, FormControl, Form } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IInputFormSubmite {
  onSubmit: (value: any) => void;
}
const InputFormSubmite: React.FC<IInputFormSubmite> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>('');
  return (
    <Form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ value });
        setValue('');
      }}
    >
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faPlus} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Введите название и нажмите Enter..."
          aria-describedby="basic-addon1"
          value={value}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value);
          }}
        />
      </InputGroup>
    </Form>
  );
};

export default memo(InputFormSubmite);
