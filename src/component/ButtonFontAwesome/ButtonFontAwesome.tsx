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
  disabled?: boolean;
  sizeIcon?: 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
}
const ListButtonFavorites: React.FC<IListButtonFavorites> = ({
  size = 'sm',
  sizeIcon,
  variant,
  tooltip,
  onClick,
  faIcon,
  disabled = false,
}) => {
  if (tooltip)
    return (
      <>
        <OverlayTrigger key={'top'} placement={'top'} overlay={<Tooltip id={`tooltip-top`}>{tooltip}</Tooltip>}>
          <Button size={size} variant={variant} onClick={onClick} disabled={disabled}>
            <FontAwesomeIcon icon={faIcon} size={sizeIcon} />
          </Button>
        </OverlayTrigger>
      </>
    );
  else
    return (
      <Button size={size} variant={variant} onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon icon={faIcon} size={sizeIcon} />
      </Button>
    );
};
export default memo(ListButtonFavorites);
