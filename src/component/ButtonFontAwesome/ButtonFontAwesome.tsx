import React, { memo } from 'react';

//? Bootstrap
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IListButtonFavorites {
  faIcon: IconDefinition;
  tooltip?: string;
  onClick: () => void;
  size?: 'sm' | 'lg';
  variant?:
    | 'link'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
}
const ListButtonFavorites: React.FC<IListButtonFavorites> = ({
  size = 'sm',
  variant,
  tooltip,
  onClick,
  faIcon,
}) => {
  if (tooltip)
    return (
      <>
        <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={<Tooltip id={`tooltip-top`}>{tooltip}</Tooltip>}
        >
          <Button size={size} variant={variant} onClick={onClick}>
            <FontAwesomeIcon icon={faIcon} />
          </Button>
        </OverlayTrigger>
      </>
    );
  else
    return (
      <Button size={size} variant={variant} onClick={onClick}>
        <FontAwesomeIcon icon={faIcon} />
      </Button>
    );
};
export default memo(ListButtonFavorites);
