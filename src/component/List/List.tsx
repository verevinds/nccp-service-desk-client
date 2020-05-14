import React, { memo, useState } from 'react';
import styles from './styles.module.css';
import { IList } from './interface';
//? Bootstrap
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const List: React.FC<IList> = ({
  title,
  onSubmit,
  onDelete,
  onClick,
  activeId,
  list,
}) => {
  const [input, setInput] = useState('');
  return (
    <Col xs={3}>
      <h2>{title}</h2>
      {!!onSubmit ? (
        <Form
          onSubmit={(event: any) => {
            if (!!onSubmit) {
              //@ts-ignore
              onSubmit(event, input);
              setInput('');
            }
          }}
        >
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder='Введите название и нажмите "Enter"'
              value={input}
              onChange={(event: any) => {
                setInput(event.target.value);
              }}
            />
          </Form.Group>
        </Form>
      ) : null}

      <ListGroup variant="flush">
        {!!list.length ? (
          list.map((item) => {
            return (
              <ListGroup.Item
                key={item.id}
                className={item.id === activeId ? `active` : undefined}
              >
                <Row>
                  <Col xs={9}>
                    <div
                      className={!!onClick ? styles.item : undefined}
                      onClick={() => {
                        if (!!onClick) {
                          //@ts-ignore
                          onClick(item.id);
                        }
                      }}
                    >
                      {item.name}
                    </div>
                  </Col>
                  {!!onDelete && !item.noChange ? (
                    <Col xs={3}>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          //@ts-ignore
                          onDelete(item.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  ) : null}
                </Row>
              </ListGroup.Item>
            );
          })
        ) : (
          <small className="text-muted text-center">Данные отсутствуют</small>
        )}
      </ListGroup>
    </Col>
  );
};
export default memo(List);
