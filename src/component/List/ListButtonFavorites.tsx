import React, { memo } from 'react';
import { IListButtonFavorites } from './interface';
//? Bootstrap
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

const ListButtonFavorites: React.FC<IListButtonFavorites> = ({
  onFavorites,
}) => {
  return (
    <>
      <Button
        size="sm"
        variant="warning"
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
