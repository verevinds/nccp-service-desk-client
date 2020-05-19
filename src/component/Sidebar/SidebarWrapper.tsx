import React, { memo, useState, useEffect } from 'react';
import { ISidebarWrapper } from './interface';
import { Container } from 'react-bootstrap';
import SidebarHistory from './SidebarHistory';
import styles from './sidebarWrapper.module.css';
import Sidebar from './Sidebar';

const SidebarWrapper: React.FC<ISidebarWrapper> = ({
  title,
  list,
  onClick,
  activeId,
  onClickHistory,
}) => {
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  useEffect(() => {
    if (title) {
      const newBlogTitle = <h3>{title}</h3>;
      setBlogTitle(newBlogTitle);
    }
  }, [title, list]);
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
