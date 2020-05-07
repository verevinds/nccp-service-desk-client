import React, { memo, useState, useEffect } from 'react';
import styles from './styles.module.css';

//Interface TypeScript for function Sidebar
import { IListEdit } from './interface';
//? Bootstrap
import { Row, Col, Container, ListGroup, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ListEdit: React.FC<IListEdit> = ({
  title,
  list,
  setNumber,
  activeId,
  actionCreator,
  route,
  onClick,
  categoryId,
}) => {
  const dispatch = useDispatch();

  //! Определить локальное состояние и обработчик
  // Define local state and handleState
  const [state, setState] = useState({ name: '', categoryId });
  useEffect(() => {
    if (categoryId) {
      setState({ name: '', categoryId });
    }
  }, [categoryId]);

  //! Определить функцию обработки события
  // Define function handle submit
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (route) {
      //@ts-ignore
      dispatch(actionCreator(route, 'post', state));
      setState({ name: '', categoryId: undefined });
    }
  };
  return (
    <Col xs={4}>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>
              <h2>{title}</h2>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder='Введите название и нажмите "Enter"'
              value={state.name}
              onChange={(event: any) => {
                setState({ ...state, name: event.target.value });
              }}
            />
          </Form.Group>
        </Form>
        <ListGroup variant="flush">
          {list ? (
            list.map((item) => (
              <ListGroup.Item
                key={item.id}
                className={item.id === activeId ? `active` : undefined}
              >
                <Row>
                  <Col xs={9}>
                    <div
                      className={styles.item}
                      onClick={() => {
                        if (onClick) {
                          //@ts-ignore
                          onClick(item.id, setNumber || null);
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
                        //@ts-ignore
                        dispatch(actionCreator(route, 'delete', '', item.id));
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
