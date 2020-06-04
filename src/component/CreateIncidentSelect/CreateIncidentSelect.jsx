import React, { memo } from 'react';

/**Bootstrap components */
import { Form } from 'react-bootstrap';

const CreateIncidentModalSelect = ({
  onChange,
  list,
  title = '',
  currentIdProperty,
}) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      {!!title ? <Form.Label>{title}</Form.Label> : null}
      <Form.Control as="select" onChange={onChange}>
        {list.length
          ? list.map((item) => {
              if (!item.isArchive) {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              } else return undefined;
            })
          : null}
      </Form.Control>
    </Form.Group>
  );
};

export default memo(CreateIncidentModalSelect);
