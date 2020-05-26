import React, { memo, useState, useRef } from 'react';
import styles from './styles.module.css';
//Bootstrap
import {
  Popover,
  OverlayTrigger,
  ListGroup,
  Button,
  Overlay,
} from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faDownload,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

const PopUpMenu = ({ url }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <FontAwesomeIcon
        size="lg"
        icon={faEllipsisV}
        onClick={handleClick}
        className={styles.button}
      />
      {show ? (
        <div className={styles.overlay} onClick={handleClick}></div>
      ) : undefined}
      <Overlay
        show={show}
        target={target}
        placement="left"
        container={ref.current}
        containerPadding={20}
        className={styles.customOverlay}
      >
        <Popover id="popover-basic" className={styles.popover}>
          <Popover.Content>
            <ListGroup variant="flush">
              <ListGroup.Item action href={url} download>
                <FontAwesomeIcon icon={faDownload} /> {` Скачать`}
              </ListGroup.Item>
              <ListGroup.Item action href={url} target={'_blank'}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />{' '}
                {` Открыть в новом окне`}
              </ListGroup.Item>
            </ListGroup>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
};

export default memo(PopUpMenu);
