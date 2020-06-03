import React, { memo, useContext, useMemo, useEffect, useState } from 'react';
import styles from './styles.module.css';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';

//? Bootstrap
import { Row, Col, ListGroup, Container } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faAngleRight,
  faArrowUp,
  faArrowDown,
  faBox,
  faBoxOpen,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { ListContext } from './context';
import Fade from 'react-reveal/Fade';
import Popup from '../Popup/Popup';

import { TList, IHandle } from './List';
import ListItemTag from './ListItemTag';
import ModalWindow from '../ModalWindow/ModalWindow';
export interface IListItem extends IHandle {
  item: TList;
  activeId?: number;
}

const ListItem: React.FC<IListItem> = ({
  item: { id, name, level, noChange, isArchive, bind },
  onClick,
  onDelete,
  onFavorites,
  onArchive,
}) => {
  const { activeId, setActiveId } = useContext(ListContext);
  let handleBind = true;
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

  const buttonBind = useMemo(() => {
    if (!!handleBind)
      return (
        <ButtonFontAwesome
          faIcon={faLink}
          onClick={() => {}}
          variant={'primary'}
          tooltip={'Связи'}
        />
      );
  }, [handleBind]);

  const content = useMemo(() => {
    let buttonArray = [];

    if (!!buttonArchive || !!buttonDelete || !!buttonFavorites) {
      if (!!isArchive) {
        buttonArray.push(buttonArchive, buttonDelete);
      } else if (!!buttonArchive) {
        buttonArray.push(buttonArchive, buttonFavorites);
      } else {
        buttonArray.push(buttonFavorites);
      }
    }

    if (buttonBind) buttonArray.push(buttonBind);

    if (buttonArray.length) return buttonArray;
  }, [buttonArchive, buttonDelete, buttonFavorites, isArchive, buttonBind]);
  let jsx = useMemo(() => {}, []);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  // const [focus, setFocus] = useState<string | undefined>(undefined);
  // const [idFocus, setIdFocus] = useState<number | undefined>(undefined);

  // useEffect(() => {
  //   if (hasBind) {
  //     console.log('idFocus', idFocus);
  //   }
  // }, [idFocus]);

  useEffect(() => {
    if (handleBind) {
      document.addEventListener('keydown', (event: any) => {
        if (event.ctrlKey) {
          setCursor('pointer');
        }
      });
      document.addEventListener('keyup', (event: any) => {
        if (event.key === 'Control') {
          setCursor(undefined);
        }
      });
    }
  }, [handleBind]);

  let jsxTags = useMemo(() => {
    console.log(bind);
    if (!!bind)
      if (!!bind.length) if (bind[0].item) return <ListItemTag list={bind} />;
  }, [bind]);
  let color = useMemo(() => {
    if (!!isArchive) return '#e9ecef';
    if (!!bind) {
      if (!!bind[0]) {
        if (!bind[0].item && !!bind[0].id) {
          return '#eee';
        }
      }
    }
  }, [isArchive, bind]);
  let borderColor = useMemo(() => {
    if (!!bind)
      if (!!bind[0]) if (!bind[0].item && !!bind[0].id) return '#ffc107';
  }, [bind]);
  return (
    <>
      <ListGroup.Item
        key={id}
        className={`${styles.borderLeft} ${
          id === activeId ? styles.active : ''
        } ${cursor || ''} `}
        style={{
          borderLeftWidth: 3,
          borderBottomWidth: 0,
          borderColor: level ? '#ffc107' : 'transparent',
          color,
        }}
        onClick={(event: any) => {
          if (!!handleBind) {
            if (event.ctrlKey) {
            }
          }
        }}
      >
        <Fade key={id} opposite collapse bottom>
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
          <Row>{jsxTags}</Row>
        </Fade>
      </ListGroup.Item>
    </>
  );
};

export default memo(ListItem);
