import React, { memo, useState, useEffect, useMemo, Fragment } from 'react';
import { ISidebarWrapper } from '../Sidebar/interface';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import SidebarHistory from '../Sidebar/SidebarHistory';
import styles from './wrapperSidebar.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SidebarFilter from '../SidebarFilter/SidebarFilter';
import SidebarTitle from '../SidebarTitle/SidebarTitle';
import { filterSet } from '../../redux/actionCreators/filterAction';

const SidebarWrapper: React.FC<ISidebarWrapper> = ({ title, list, onClick, activeId, onClickHistory }) => {
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const filterState = useSelector((state: any) => state.filter, shallowEqual);
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  const [anotherFilter, setAnotherFilter] = useState<any>(undefined);
  const [filter, setFilter] = useState<any>(undefined);
  const dispatch = useDispatch();
  const responsibleList = useMemo(() => {
    if (title) {
      return list.filter((item: any) => item.numberResponsible === user.number);
    } else {
      return list;
    }
  }, [list, user, title]);

  useEffect(() => {
    console.log('filterState', filterState);
  }, [filterState]);
  useEffect(() => {
    let filterNoParse = localStorage.getItem('filter');
    let filter = !!filterNoParse && JSON.parse(filterNoParse);
    dispatch(filterSet(filter));
  }, []);
  const anotherList = useMemo(() => {
    let newList = list.filter((item: any) => item.numberResponsible !== user.number);

    let combineList: import('./interface').TList[][] = [];
    for (let key in filterState) {
      if (filterState[key].length) {
        filterState[key].forEach((element: any) => {
          combineList.push(newList.filter((item: any) => item[key] === Number(element)));
        });
      }
    }
    let flatCombineList = combineList.flat();
    console.log('combineList', combineList);
    console.log('flatCombineList', flatCombineList);
    let uniqueFlatCombineList = Array.from(new Set(flatCombineList));
    console.log('uniqueFlatCombineList', uniqueFlatCombineList);

    return uniqueFlatCombineList;
  }, [list, user, filterState]);

  useEffect(() => {
    if (title) {
      const newBlogTitle = <SidebarTitle title={title} />;
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
              <Sidebar list={responsibleList} onClick={onClick} activeId={activeId} filter={filter} />
            </Fragment>
          ) : undefined}

          {anotherList?.length && title ? (
            <Fragment>
              <br />
              <div className={styles.title}>
                <h6>Остальные заявки</h6>
                <SidebarFilter setFilter={setAnotherFilter} />
              </div>
              <Sidebar list={anotherList} filter={anotherFilter} onClick={onClick} activeId={activeId} />
            </Fragment>
          ) : undefined}

          <SidebarHistory onClick={onClick} activeId={activeId} onClickHistory={onClickHistory} />
        </div>
      </Container>
    </Fragment>
  );
};
export default memo(SidebarWrapper);
