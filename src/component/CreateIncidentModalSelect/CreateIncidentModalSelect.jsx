import React, { memo } from 'react';

/**Bootstrap components */
import { Form } from 'react-bootstrap';

const CreateIncidentModalSelect = ({ onChange, category, title = '' }) => {
  // console.log(title, category);
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      {title ? <Form.Label>{title}</Form.Label> : null}
      <Form.Control as="select" onChange={onChange}>
        {category.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default memo(CreateIncidentModalSelect);
