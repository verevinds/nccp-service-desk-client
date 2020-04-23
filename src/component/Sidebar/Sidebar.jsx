import React, { memo } from 'react';
import styles from './styles.module.css';
import { Container, Badge, ListGroup } from 'react-bootstrap';

const Sidebar = (props) => {
  return (
    <Container>
      <h3>
        Инциденты
        <Badge variant="primary" className="ml-3">
          {1}
        </Badge>
      </h3>
      <div className={styles.block}>
        <ListGroup variant="flush">
          <ListGroup.Item variant="primary">
            №210324 - Замена картриджа
          </ListGroup.Item>
          <ListGroup.Item>№210543 - Замена принтера</ListGroup.Item>
          <ListGroup.Item>№210234 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
          <ListGroup.Item>№210654 - Ремонт принтера</ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
};

export default memo(Sidebar);
