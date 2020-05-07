import React, { memo } from 'react';
import styles from './styles.module.css';
import { Container, Badge, ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';

//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

const Sidebar: React.FC<ISidebar> = ({
  title,
  list,
  isLoading,
  onClick,
  activeId,
}) => {
  let blogTitle: JSX.Element | null = null;
  console.log('Sidebar', list);
  if (title) {
    blogTitle = (
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
          {list.map((item) => {
            let { id, name, createdAt } = item;
            let itemText: string;
            if (createdAt) {
              itemText = `№${id} - ${name ? name : 'N/A'} `;
            } else {
              itemText = `${name ? name : 'N/A'} `;
            }
            return (
              <ListGroup.Item
                key={id}
                //@ts-ignore
                onClick={onClick ? () => onClick(id) : null}
                className={`${styles.item} ${
                  activeId === id ? styles.active : null
                }`}
              >
                {itemText}
                {createdAt ? (
                  <Moment locale="ru" format="DD.MM">
                    {createdAt}
                  </Moment>
                ) : null}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </Container>
  );
};

export default memo(Sidebar);
