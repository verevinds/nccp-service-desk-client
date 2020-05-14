import React, { memo, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Container, Badge, ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';

//Interface TypeScript for function Sidebar
import { ISidebar } from './interface';

const Sidebar: React.FC<ISidebar> = ({
  title,
  list,
  isLoading,
  badge,
  onClick,
  activeId,
}) => {
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  useEffect(() => {
    if (title) {
      const newBlogTitle = (
        <h3>
          {title}
          {badge ? (
            <Badge variant="primary" className="ml-3">
              {list.length}
            </Badge>
          ) : null}
        </h3>
      );
      setBlogTitle(newBlogTitle);
    }
  }, [title, list, badge]);

  const [jsxListItem, setJsxListItem] = useState([
    <p key={0}>Загрузка данных</p>,
  ]);
  useEffect(() => {
    const jsxItem = list.map((item) => {
      let { id, name, createdAt, status, responsible } = item;
      let itemText: string;
      if (createdAt) {
        itemText = `№${id} - ${name ? name : 'N/A'} ${responsible} ${status}`;
      } else {
        itemText = `${name ? name : 'N/A'} `;
      }
      return (
        <ListGroup.Item
          key={id}
          //@ts-ignore
          onClick={onClick ? () => onClick(id) : null}
          className={`${styles.item} ${activeId === id ? styles.active : null}`}
        >
          {itemText}
          {createdAt ? (
            <Moment locale="ru" format="DD.MM">
              {createdAt}
            </Moment>
          ) : null}
        </ListGroup.Item>
      );
    });

    setJsxListItem(jsxItem);
  }, [list, activeId, onClick]);

  return (
    <Container>
      {blogTitle}
      <div className={styles.block}>
        <ListGroup variant="flush">{jsxListItem}</ListGroup>
      </div>
    </Container>
  );
};

export default memo(Sidebar);
