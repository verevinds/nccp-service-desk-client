import React, { memo, useContext, useMemo, useEffect, useState } from 'react';
import styles from './styles.module.css';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { useSelector, shallowEqual } from 'react-redux';

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
  faClock,
  faPencilRuler,
} from '@fortawesome/free-solid-svg-icons';
import { ListContext } from './context';
import Fade from 'react-reveal/Fade';
import Popup from '../Popup/Popup';

import { TList, IHandle } from './List';
import ListItemTag from './ListItemTag';
import { IState } from '../../interface';

export interface IListItem extends IHandle {
  item: TList;
  activeId?: number;
  handleBind?: THandleBind;
}

export type THandleBind = {
  id: number;
  subId?: number[] | [];
  handleBind: (id: number) => void;
  bindDelete?: (id: number) => void;
};
const ListItem: React.FC<IListItem> = ({
  item: { id, name, level, noChange, isArchive, bind },
  onClick,
  onDelete,
  onFavorites,
  onArchive,
  handleDedline,
  handleBind,
  handleTune,
}) => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const { user } = useSelector((state: IState) => state.auth, shallowEqual);
  const { activeId, setActiveId } = useContext(ListContext);

  const buttonDelete = useMemo(() => {
    let access = user && Boolean(~user.accesses.findIndex((item: any) => item.access === 999));
    if (!!onDelete && !noChange)
      return (
        <ButtonFontAwesome
          faIcon={faTrash}
          onClick={() => {
            if (window.confirm(`Все связаные заявки исчезнут! Удалить?`)) onDelete({ id });
          }}
          variant={'danger'}
          tooltip={`Удалить`}
          disabled={!access}
        />
      );
  }, [onDelete, noChange, id, user]);

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

  const buttonDedline = useMemo(() => {
    if (!!handleDedline)
      return (
        <ButtonFontAwesome
          faIcon={faClock}
          onClick={() => {
            handleDedline({ id });
          }}
          variant={'primary'}
          tooltip={'Срок выполнения'}
        />
      );
  }, [handleDedline, id]);

  const buttonTune = useMemo(() => {
    if (!!handleTune)
      return (
        <ButtonFontAwesome
          faIcon={faPencilRuler}
          onClick={() => {
            handleTune({ id });
          }}
          variant={'primary'}
          tooltip={'Настроить'}
        />
      );
  }, [id, handleTune]);

  const content = useMemo(() => {
    let buttonArray = [];

    buttonTune && buttonArray.push(buttonTune);
    buttonDedline && buttonArray.push(buttonDedline);

    if (!!buttonArchive || !!buttonDelete || !!buttonFavorites) {
      if (!!isArchive) {
        buttonArray.push(buttonArchive, buttonDelete);
      } else if (!!buttonArchive) {
        buttonArray.push(buttonArchive, buttonFavorites);
      } else {
        buttonArray.push(buttonFavorites);
      }
    }

    if (buttonArray.length) return buttonArray;
  }, [buttonArchive, buttonDelete, buttonFavorites, isArchive, buttonDedline]);

  let jsxTags = useMemo(() => {
    if (!!bind)
      if (!!bind.length)
        if (bind[0].item) return <ListItemTag list={bind} cursor={Boolean(cursor)} handleBind={handleBind} />;
  }, [bind, cursor, handleBind]);

  let active = useMemo(() => {
    if (handleBind) {
      if (handleBind.id === id) return styles.active;
    }
    if (id === activeId) return styles.active;
  }, [handleBind, activeId, id]);
  let color = useMemo(() => {
    if (!!bind) {
      if (!!bind[0]) {
        if (!bind[0].item && !!bind[0].id) {
          return styles.isArchive;
        }
      }
    }
  }, [bind]);
  const [ctrlKey, setCtrlKey] = useState(false);
  useEffect(() => {
    if (!!handleBind) {
      document.addEventListener('keydown', (event: any) => {
        if (event.ctrlKey) {
          setCursor('pointer');
          setCtrlKey(true);
        }
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
      <div className={cursor ? styles.overlay : ''}></div>
      <ListGroup.Item
        key={id}
        className={`${!!handleBind ? styles.focus : ''} ${active || ''} ${cursor || color} ${
          isArchive ? styles.isArchive : styles.borderLeft
        }`}
        style={{
          borderLeftWidth: 3,
          borderBottomWidth: 0,
          borderColor: level ? '#ffc107' : 'transparent',
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
            {!!content && !cursor ? (
              <Col xs={1} className={styles.buttonGroup}>
                <div className={styles.buttonGroup_flexRow}>
                  <Popup content={content} />
                </div>
              </Col>
            ) : undefined}

            <Col xs={1} className={`${styles.icon}`}>
              {id === activeId ? <FontAwesomeIcon icon={faAngleRight} /> : undefined}
            </Col>
          </Row>
        </Fade>
        {!isArchive ? <Row>{jsxTags}</Row> : undefined}
      </ListGroup.Item>
    </>
  );
};

export default memo(ListItem);
