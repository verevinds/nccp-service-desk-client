import React, { memo } from 'react';
import styles from './styles.module.css';

//? Bootstrap
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ListButtonFavorites from './ListButtonFavorites';

import Fade from 'react-reveal/Fade';

const ListItem = ({ filterList, onClick, onDelete, onFavorites, activeId }) => {
  return (
    <ListGroup variant="flush">
      {!!filterList.length ? (
        filterList
          .sort((a, b) => {
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
                <Fade key={item.id} opposite collapse bottom>
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
                </Fade>
              </ListGroup.Item>
            );
          })
      ) : (
        <small className="text-muted text-center">Данные отсутствуют</small>
      )}
    </ListGroup>
  );
};
export default memo(ListItem);
