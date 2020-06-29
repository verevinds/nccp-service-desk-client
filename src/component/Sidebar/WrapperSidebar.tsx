import React, { memo, useState, useEffect, useMemo, Fragment } from 'react';
import { ISidebarWrapper } from '../Sidebar/interface';
import { useSelector, shallowEqual } from 'react-redux';
import { Container } from 'react-bootstrap';
import SidebarHistory from '../Sidebar/SidebarHistory';
import styles from './wrapperSidebar.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SidebarFilter from '../SidebarFilter/SidebarFilter';

const SidebarWrapper: React.FC<ISidebarWrapper> = ({
  title,
  list,
  onClick,
  activeId,
  onClickHistory,
}) => {
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  const [anotherFilter, setAnotherFilter] = useState<any>(undefined);
  const [filter, setFilter] = useState<any>(undefined);

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
    <Fragment>
      <Container>
        {blogTitle}
        <div className={styles.block}>
          {responsibleList.length ? (
            <Fragment>
              <br />
              <div className={styles.title}>
                {title ? <h6>Моя ответственность</h6> : <h6>Мои заявки</h6>}
                <SidebarFilter setFilter={setFilter} />
              </div>
              <Sidebar
                list={responsibleList}
                onClick={onClick}
                activeId={activeId}
                filter={filter}
              />
            </Fragment>
          ) : undefined}

          {anotherList?.length && title ? (
            <Fragment>
              <br />
              <div className={styles.title}>
                <h6>Остальные заявки</h6>
                <SidebarFilter setFilter={setAnotherFilter} />
              </div>
              <Sidebar
                list={anotherList}
                filter={anotherFilter}
                onClick={onClick}
                activeId={activeId}
              />
            </Fragment>
          ) : undefined}

          <SidebarHistory
            onClick={onClick}
            activeId={activeId}
            onClickHistory={onClickHistory}
          />
        </div>
      </Container>
    </Fragment>
  );
};
export default memo(SidebarWrapper);
