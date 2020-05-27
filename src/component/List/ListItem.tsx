import React, { memo, useContext } from 'react';
import styles from './styles.module.css';
import { IListItem } from './interface';

//? Bootstrap
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ListButtonFavorites from './ListButtonFavorites';
import { ListContext } from './context';
import Fade from 'react-reveal/Fade';

const ListItem: React.FC<IListItem> = ({
  item: { id, name, level, noChange },
  onClick,
  onDelete,
  onFavorites,
}) => {
  const constext = useContext(ListContext);

  return (
    <Fade key={id} opposite collapse bottom>
      <ListGroup.Item
        key={id}
        className={id === constext.activeId ? `active` : undefined}
        variant={!!level ? 'warning' : undefined}
      >
        <Row>
          <Col xs={9}>
            <div
              className={!!onClick ? styles.item_pointer : undefined}
              onClick={() => {
                if (!!onClick) {
                  //@ts-ignore
                  onClick(id);
                  constext.setActiveId(id);
                }
              }}
            >
              <span>{name}</span>
            </div>
          </Col>
          <Col xs={3} className={styles.buttonGroup}>
            <div className={styles.buttonGroup_flexRow}>
              {!!onDelete && !noChange ? (
                <Button
                  size="sm"
                  variant="danger"
                  onClick={onDelete.bind(null, id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              ) : null}
              {!!onFavorites ? (
                <ListButtonFavorites
                  onFavorites={onFavorites.bind(null, id)}
                  level={Boolean(level)}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    </Fade>
  );
};

export default memo(ListItem);
