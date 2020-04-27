import React, { memo } from 'react';

//?Bootstrap
import { Col, Container } from 'react-bootstrap';

const ListEdit = (props) => {
  console.log(props);
  return (
    <Col>
      <Container>
        <h2></h2>
        {props.list
          ? props.list.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  props.onClick(item.id);
                }}
              >
                {item.name}
              </li>
            ))
          : null}
      </Container>
    </Col>
  );
};

export default memo(ListEdit);
