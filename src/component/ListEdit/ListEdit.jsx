import React, { memo, useState, useEffect } from 'react';
import styles from './styles.module.css';

//? Bootstrap
import { Col, Container, ListGroup, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const ListEdit = (props) => {
  const dispatch = useDispatch();

  //! Определить локальное состояние и обработчик
  // Define local state and handleState
  const [state, setState] = useState({ name: '' });
  useEffect(() => {
    if (props.categoryId) {
      setState({ name: '', categoryId: props.categoryId });
    }
  }, [props.categoryId]);

  //! Определить функцию обработки события
  // Define function handle submit
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(props.actionCreator(state));
    setState({ name: '' });
  };
  return (
    <Col xs={3}>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>
              <h2>{props.title}</h2>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder='Введите название и нажмите "Enter"'
              value={state.name}
              onChange={(event) => {
                setState({ ...state, name: event.target.value });
              }}
            />
          </Form.Group>
        </Form>
        <ListGroup variant="flush">
          {props.list ? (
            props.list.map((item) => (
              <ListGroup.Item
                key={item.id}
                className={
                  item.id === props.activeId
                    ? `${styles.item} active`
                    : styles.item
                }
                onClick={() => {
                  if (props.onClick) {
                    props.onClick(item.id, props.setNumber || null);
                  }
                }}
              >
                {item.name}
              </ListGroup.Item>
            ))
          ) : (
            <small className="text-muted text-center">Данные отсутствуют</small>
          )}
        </ListGroup>
      </Container>
    </Col>
  );
};

export default memo(ListEdit);
