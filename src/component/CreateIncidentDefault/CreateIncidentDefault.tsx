import React, { memo, Fragment } from 'react';
/**Bootstrap components */
import { Form } from 'react-bootstrap';
export interface ICreateIncidentDefault {
  text: string;
  setText: (text: string) => void;
}

const CreateIncidentDefault: React.FC<ICreateIncidentDefault> = ({ text, setText }) => {
  return (
    <Fragment>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Содержание обращения</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          value={text}
          required
          placeholder="Опишите подробно ситуацию"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setText(event.currentTarget.value);
          }}
        />
      </Form.Group>
    </Fragment>
  );
};

export default memo(CreateIncidentDefault);
