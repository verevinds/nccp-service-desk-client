import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import './styles.css';

/**Bootstrap component */
import { Button, Badge } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderButton = ({
  page,
  setPage,
  faIcon,
  newIncidentCount,
  text,
  to,
}) => {
  const [view, setView] = useState(false);

  return (
    <Button
      as={NavLink}
      to={to}
      className="mr-1"
      variant={page === to ? 'light' : 'link'}
      onClick={() => {
        setPage(to);
      }}
      onMouseOver={() => {
        setView(true);
      }}
      onMouseOut={() => {
        setView(false);
      }}
      active={false}
    >
      <FontAwesomeIcon
        icon={faIcon}
        size="lg"
        className={text ? 'mr-1' : undefined}
      />
      {text ? <span>{text}</span> : undefined}
      {!!newIncidentCount ? (
        <Badge variant="primary" className={'ml-1'}>
          {newIncidentCount}
        </Badge>
      ) : undefined}
    </Button>
  );
};

export default memo(HeaderButton);
