import React, { memo, useContext, useMemo, useEffect, useState } from 'react';
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
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { ListContext } from './context';
import Fade from 'react-reveal/Fade';
import Popup from '../Popup/Popup';

import { TList, IHandle } from './List';
import ListItemTag from './ListItemTag';

export interface IListItem extends IHandle {
  item: TList;
  activeId?: number;
  handleBind?: THandleBind;
}

export type THandleBind = {
  id: number;
  subId?: number[] | [];
  handleBind: (id: number) => void;
};
const ListItem: React.FC<IListItem> = ({
  item: { id, name, level, noChange, isArchive, bind },
  onClick,
  onDelete,
  onFavorites,
  onArchive,
  handleBind,
}) => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
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

  let jsxTags = useMemo(() => {
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

  let active = useMemo(() => {
    if (handleBind) {
      if (handleBind.id === id) return styles.active;
    }
    if (id === activeId) return styles.active;
  }, [handleBind, activeId, id]);

  const [ctrlKey, setCtrlKey] = useState(false);
  useEffect(() => {
    if (!!handleBind) {
      document.addEventListener('keydown', (event: any) => {
        if (event.ctrlKey) {
          setCursor('pointer');
          setCtrlKey(true);
        }
      });

      document.addEventListener('keypress', (event: any) => {
        console.log(event.keyCode);
      });
      document.addEventListener('keyup', (event: any) => {
        if (event.key === 'Control') {
          setCursor(undefined);
          handleBind.handleBind(0);
          setCtrlKey(false);
        }
      });
    }
  }, [handleBind]);

  return (
    <>
      <ListGroup.Item
        key={id}
        className={`${styles.borderLeft} ${active || ''} ${cursor || ''} `}
        style={{
          borderLeftWidth: 3,
          borderBottomWidth: 0,
          borderColor: level ? '#ffc107' : 'transparent',
          color,
        }}
        onClick={(event: any) => {
          if (!!handleBind) {
            if (ctrlKey) {
              handleBind.handleBind(id);
              setCtrlKey(false);
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
        </Fade>
        <Row>{jsxTags}</Row>
      </ListGroup.Item>
    </>
  );
};

export default memo(ListItem);
