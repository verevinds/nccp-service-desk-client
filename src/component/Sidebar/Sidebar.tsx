import * as React from 'react';
import styles from './styles.module.css';
import { Container, Badge, ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';
import { ISidebar } from './interface';

const Sidebar: React.FC<ISidebar> = ({
  title,
  list,
  isLoading,
  onClick,
  activeId,
}) => {
  let blogTitle: JSX.Element | null = null;
  console.log('list', list);
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
            return (
              <ListGroup.Item
                key={id}
                //@ts-ignore
                onClick={() => onClick(id)}
                className={`${styles.item} ${
                  activeId === id ? styles.active : null
                }`}
              >
                {`№${id} - ${name ? name : 'N/A'} `}
                <Moment locale="ru" format="DD.MM">
                  {createdAt}
                </Moment>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </Container>
  );
};

export default React.memo(Sidebar);
