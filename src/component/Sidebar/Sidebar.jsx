import React, { memo } from 'react';
import styles from './styles.module.css';
import { Container, Badge, ListGroup } from 'react-bootstrap';

const Sidebar = ({ list, isLoading }) => {
  return (
    <Container>
      <h3>
        Инциденты
        <Badge variant="primary" className="ml-3">
          {isLoading ? list.length : ''}
        </Badge>
      </h3>
      <div className={styles.block}>
        <ListGroup variant="flush">
          {/* <ListGroup.Item variant="primary">
            №210324 - Замена картриджа
          </ListGroup.Item> */}
          {isLoading
            ? list.map((item) => (
                <ListGroup.Item key={item.id}>
                  №{item.id} -{' '}
                  {item.property ? item.property.name : item.category.name}{' '}
                  {item.option ? item.option.name : ''}
                </ListGroup.Item>
              ))
            : 'Загрузка инцидентов...'}
        </ListGroup>
      </div>
    </Container>
  );
};

export default memo(Sidebar);
