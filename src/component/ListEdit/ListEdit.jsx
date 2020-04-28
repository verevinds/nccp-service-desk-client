import React, { memo, useState, useEffect } from 'react';
import styles from './styles.module.css';

//? Bootstrap
import { Row, Col, Container, ListGroup, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
//? Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
    if (props.route) {
      console.log('route', props.route);
      dispatch(props.actionCreator(props.route, 'post', state));
      setState({ name: '' });
    }
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
                className={item.id === props.activeId ? `active` : null}
              >
                <Row>
                  <Col xs={9}>
                    <div
                      className={styles.item}
                      onClick={() => {
                        if (props.onClick) {
                          props.onClick(item.id, props.setNumber || null);
                        }
                      }}
                    >
                      {item.name}
                    </div>
                  </Col>
                  <Col xs={3}>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        dispatch(
                          props.actionCreator(
                            props.route,
                            'delete',
                            '',
                            item.id,
                          ),
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
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
