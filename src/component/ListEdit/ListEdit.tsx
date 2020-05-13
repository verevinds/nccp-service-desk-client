import React, { memo, useState, useEffect } from 'react';
import styles from './styles.module.css';

//Interface TypeScript for function Sidebar
import { IListEdit } from './interface';
//? Bootstrap
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
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
  departmentId,
  categoryId,
  inputOff,
}) => {
  const dispatch = useDispatch();
  //! Определить локальное состояние и обработчик
  // Define local state and handleState
  const [state, setState] = useState({ name: '', categoryId, departmentId });
  useEffect(() => {
    if (categoryId) {
      setState({ name: '', categoryId, departmentId });
    } else if (departmentId) {
      setState({ name: '', categoryId, departmentId });
    }
  }, [categoryId, departmentId]);

  //! Определить функцию обработки события
  // Define function handle submit
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (route) {
      //@ts-ignore
      dispatch(actionCreator(route, 'post', state));
      setState({ name: '', categoryId: undefined, departmentId });
    }
  };
  return (
    <Col xs={3}>
      <h2>{title}</h2>
      {inputOff ? null : (
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder='Введите название и нажмите "Enter"'
              value={state.name}
              onChange={(event: any) => {
                setState({ ...state, name: event.target.value, departmentId });
              }}
            />
          </Form.Group>
        </Form>
      )}

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
                {inputOff ? null : (
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
                )}
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <small className="text-muted text-center">Данные отсутствуют</small>
        )}
      </ListGroup>
    </Col>
  );
};

export default memo(ListEdit);
