import React, { memo, useState, useEffect } from 'react';
import { ISidebarWrapper } from './interface';
import { Container, Badge } from 'react-bootstrap';
import SidebarHistory from './SidebarHistory';
import styles from './sidebarWrapper.module.css';
import Sidebar from './Sidebar';

const SidebarWrapper: React.FC<ISidebarWrapper> = ({
  title,
  badge,
  list,
  isLoading,
  onClick,
  activeId,
  onClickHistory,
}) => {
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  useEffect(() => {
    if (title) {
      const newBlogTitle = (
        <h3>
          {title}
          {badge && list.length ? (
            <Badge variant="primary" className="ml-3">
              {list.filter((item) => Number(item.status) > 0).length}
            </Badge>
          ) : null}
        </h3>
      );
      setBlogTitle(newBlogTitle);
    }
  }, [title, list, badge]);
  return (
    <>
      <Container>
        {blogTitle}
        <div className={styles.block}>
          {Array.isArray(list) && list.length ? (
            <Sidebar list={list} onClick={onClick} activeId={activeId} />
          ) : null}
          <SidebarHistory
            onClick={onClick}
            activeId={activeId}
            onClickHistory={onClickHistory}
          />
        </div>
      </Container>
    </>
  );
};
export default memo(SidebarWrapper);
