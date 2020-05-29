import React, { memo, useContext, useMemo } from 'react';
import styles from './styles.module.css';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';

//? Bootstrap
import { Row, Col, ListGroup } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faAngleRight,
  faArrowUp,
  faArrowDown,
  faBox,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';
import { ListContext } from './context';
import Fade from 'react-reveal/Fade';
import Popup from '../Popup/Popup';

import { THandle, TList } from './List';
export interface IListItem extends THandle {
  item: TList;
  activeId?: number;
}

const ListItem: React.FC<IListItem> = ({
  item: { id, name, level, noChange, isArchive },
  onClick,
  onDelete,
  onFavorites,
  onArchive,
}) => {
  const { activeId, setActiveId } = useContext(ListContext);
  const buttonDelete = useMemo(() => {
    if (!!onDelete && !noChange)
      return (
        <ButtonFontAwesome
          faIcon={faTrash}
          onClick={() => {
            if (window.confirm(`Все связаные инциденты исчезнут! Удалить?`))
              onDelete({ id });
          }}
          variant={'danger'}
          tooltip={`Удалить`}
        />
      );
  }, [onDelete, noChange, id]);
  const buttonFavorites = useMemo(() => {
    if (!!onFavorites)
      return (
        <ButtonFontAwesome
          faIcon={level ? faArrowDown : faArrowUp}
          onClick={() => onFavorites({ id })}
          variant={level ? 'warning' : 'light'}
          tooltip={level ? 'Понизить приоритет' : `Повысить приоритет`}
        />
      );
  }, [onFavorites, level, id]);

  const buttonArchive = useMemo(() => {
    if (!!onArchive)
      return (
        <ButtonFontAwesome
          faIcon={!!isArchive ? faBoxOpen : faBox}
          onClick={() => {
            onArchive({ id });
          }}
          variant={!!isArchive ? 'primary' : 'light'}
          tooltip={!!isArchive ? 'Разархивировать' : `Архивировать`}
        />
      );
  }, [onArchive, id, isArchive]);
  const content = useMemo(() => {
    if (!!buttonArchive || !!buttonDelete || !!buttonFavorites) {
      if (!!isArchive) {
        return [buttonArchive, buttonDelete];
      } else if (!!buttonArchive) {
        return [buttonArchive, buttonFavorites];
      } else {
        return [buttonFavorites];
      }
    } else return undefined;
  }, [buttonArchive, buttonDelete, buttonFavorites, isArchive]);
  return (
    <Fade key={id} opposite collapse bottom>
      <ListGroup.Item
        key={id}
        className={`${styles.borderLeft} ${
          id === activeId ? styles.active : undefined
        }`}
        style={{
          borderLeftWidth: 3,
          borderColor: level ? '#ffc107' : 'transparent',

          color: !!isArchive ? '#e9ecef' : undefined,
        }}
      >
        <Row>
          <Col xs={9}>
            <div
              className={!!onClick ? styles.item_pointer : undefined}
              onClick={() => {
                if (!!onClick) {
                  //@ts-ignore
                  onClick(id);
                  setActiveId(id);
                }
              }}
            >
              <span>{name}</span>
            </div>
          </Col>
          {!!content ? (
            <Col xs={1} className={styles.buttonGroup}>
              <div className={styles.buttonGroup_flexRow}>
                <Popup content={content} />
              </div>
            </Col>
          ) : undefined}

          <Col xs={1} className={`${styles.icon}`}>
            {id === activeId ? (
              <FontAwesomeIcon icon={faAngleRight} />
            ) : undefined}
          </Col>
        </Row>
      </ListGroup.Item>
    </Fade>
  );
};

export default memo(ListItem);
