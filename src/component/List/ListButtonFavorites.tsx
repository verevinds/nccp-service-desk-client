import React, { memo } from 'react';
import { IListButtonFavorites } from './interface';

//? Bootstrap
import { Button } from 'react-bootstrap';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ListButtonFavorites: React.FC<IListButtonFavorites> = ({
  onFavorites,
  level,
}) => {
  return (
    <>
      <Button
        size="sm"
        variant={level ? 'warning' : 'light'}
        onClick={() => {
          //@ts-ignore
          onFavorites();
        }}
      >
        <FontAwesomeIcon icon={faStar} />
      </Button>
    </>
  );
};
export default memo(ListButtonFavorites);
