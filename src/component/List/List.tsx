import React, { memo, useState } from 'react';
import styles from './styles.module.css';
import { IList } from './interface';
//? Bootstrap
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ListButtonFavorites from './ListButtonFavorites';

const List: React.FC<IList> = ({
  title,
  onSubmit,
  onDelete,
  onClick,
  activeId,
  list,
  onFavorites,
}) => {
  const [input, setInput] = useState('');
  if (Array.isArray(list)) {
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
            list
              .sort((a: any, b: any) => {
                if (b.name < a.name) {
                  return 1;
                } else {
                  return -1;
                }
              })
              .map((item) => {
                return (
                  <ListGroup.Item
                    key={item.id}
                    className={item.id === activeId ? `active` : undefined}
                    variant={!!item.level ? 'warning' : undefined}
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
                      <Col xs={3}>
                        {!!onDelete && !item.noChange ? (
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
                        ) : null}
                        {!!onFavorites ? (
                          <ListButtonFavorites
                            onFavorites={onFavorites.bind(null, item.id)}
                          />
                        ) : null}
                      </Col>
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
  } else {
    return null;
  }
};
export default memo(List);
