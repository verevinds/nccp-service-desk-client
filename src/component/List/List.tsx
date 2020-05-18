import React, { memo, useState, useLayoutEffect } from 'react';
import styles from './styles.module.css';
import { IList, TList } from './interface';

//? Bootstrap
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faSearch,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';
import ListButtonFavorites from './ListButtonFavorites';

const List: React.FC<IList> = ({
  title,
  onSubmit,
  onDelete,
  onClick,
  activeId,
  list,
  onFavorites,
  xs,
}) => {
  const [input, setInput] = useState('');

  const [filterList, setFilterList] = useState<TList[]>(list);
  const [filter, setFilter] = useState('');
  useLayoutEffect(() => {
    setFilterList(
      list.filter(
        (item) => ~item.name.toLowerCase().indexOf(filter.toLowerCase()),
      ),
    );
  }, [list, filter]);
  if (Array.isArray(list)) {
    return (
      <Col xs={xs}>
        <h2>{title}</h2>
        <InputGroup className="mb-1">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Поиск..."
            aria-label="Ведущий специалист"
            aria-describedby="basic-addon1"
            onChange={(event: any) => {
              setFilter(event.target.value);
            }}
          />
        </InputGroup>
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
              <InputGroup className="mb-1">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faFolderPlus} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder='Введите название и нажмите "Enter"'
                  value={input}
                  onChange={(event: any) => {
                    setInput(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        ) : null}

        <ListGroup variant="flush">
          {!!list.length ? (
            filterList
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
