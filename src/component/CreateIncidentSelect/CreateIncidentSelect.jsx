import React, { memo } from 'react';
import { uid } from 'react-uid';

/**Bootstrap components */
import { Form } from 'react-bootstrap';

const CreateIncidentModalSelect = ({
  onChange,
  list,
  title = '',
  currentId,
  isModify,
}) => {
  return (
    <Form.Group controlId={`exampleForm.ControlSelect${uid(list)}`}>
      {!!title ? <Form.Label>{title}</Form.Label> : null}
      <Form.Control
        as="select"
        onChange={onChange}
        value={currentId}
        disabled={isModify}
        required={true}
      >
        <option value="">Выберите</option>
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
