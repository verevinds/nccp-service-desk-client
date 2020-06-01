import React, { memo, useState, useEffect, useMemo } from 'react';
import { ISidebarWrapper } from './interface';
import { useSelector, shallowEqual } from 'react-redux';
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
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  const [myResponsibility, setMyResponsibility] = useState<JSX.Element | null>(
    null,
  );
  const responsibleList = useMemo(() => {
    if (title) {
      return list.filter((item: any) => item.numberResponsible === user.number);
    } else {
      return list;
    }
  }, [list, user, title]);

  const anotherList = useMemo(() => {
    return list.filter((item: any) => item.numberResponsible !== user.number);
  }, [list, user]);

  useEffect(() => {
    if (title) {
      const newBlogTitle = <h4>{title}</h4>;
      setBlogTitle(newBlogTitle);
    }
  }, [title, list]);
  return (
    <>
      <Container>
        {blogTitle}
        <div className={styles.block}>
          {responsibleList.length ? (
            <>
              <br />
              {title ? <h6>Моя ответственность</h6> : <h6>Мои инциденты</h6>}
              <Sidebar
                list={responsibleList}
                onClick={onClick}
                activeId={activeId}
              />
            </>
          ) : undefined}
          {anotherList.length && title ? (
            <>
              <br />
              <h6>Остальные инциденты</h6>
              <Sidebar
                list={anotherList}
                onClick={onClick}
                activeId={activeId}
              />
            </>
          ) : undefined}
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
