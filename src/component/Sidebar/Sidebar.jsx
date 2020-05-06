import React, { memo } from 'react';
import styles from './styles.module.css';
import { Container, Badge, ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';

const Sidebar = ({ title, list, isLoading, onClick, activeId }) => {
  if (title) {
    var blogTitle = (
      <h3>
        {title}
        <Badge variant="primary" className="ml-3">
          {isLoading ? list.length : ''}
        </Badge>
      </h3>
    );
  }
  return (
    <Container>
      {blogTitle ? blogTitle : null}
      <div className={styles.block}>
        <ListGroup variant="flush">
          {/* <ListGroup.Item variant="primary">
            №210324 - Замена картриджа
          </ListGroup.Item> */}
          {isLoading
            ? list.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  onClick={() => onClick(item.id)}
                  className={`${styles.item} ${
                    activeId === item.id ? styles.active : null
                  }`}
                >
                  №{item.id} -{' '}
                  {item.property ? item.property.name : item.category.name}{' '}
                  {item.option ? item.option.name : ''}{' '}
                  <Moment locale="ru" format="DD.MM">
                    {item.createdAt}
                  </Moment>
                </ListGroup.Item>
              ))
            : 'Загрузка данных...'}
        </ListGroup>
      </div>
    </Container>
  );
};

export default memo(Sidebar);
