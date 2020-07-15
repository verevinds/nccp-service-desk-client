import React, { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

/**Bootstrap component */
import { Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderButton = ({ page, setPage, faIcon, newIncidentCount, text, to, tooltip }) => {
  const textTooltip = useMemo(() => {
    if (!!newIncidentCount)
      return `${tooltip ? tooltip.isListTooltips : ''} \n${newIncidentCount} заявка требует Вашего внимания`;
    if (tooltip) {
      if (!tooltip.list && !tooltip.isListTooltips) return tooltip.isNoListTooltips;
      if (tooltip.list && tooltip.list.length === 0) return tooltip.isNoListTooltips;
      else return tooltip.isListTooltips;
    }
  }, [tooltip, newIncidentCount]);

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 400, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">{textTooltip}</Tooltip>}
    >
      <Button
        as={NavLink}
        to={to}
        className={`mr-1 `}
        variant={page === to ? 'light' : 'link'}
        onClick={() => {
          if (tooltip && tooltip.list && tooltip.list.length) setPage(to);
        }}
      >
        <FontAwesomeIcon icon={faIcon} size="lg" className={text ? 'mr-1' : undefined} />
        {text ? <span>{text}</span> : undefined}
        {!!newIncidentCount ? (
          <Badge variant="primary" className={'ml-1 font-light'}>
            {newIncidentCount}
          </Badge>
        ) : undefined}
      </Button>
    </OverlayTrigger>
  );
};

export default memo(HeaderButton);
