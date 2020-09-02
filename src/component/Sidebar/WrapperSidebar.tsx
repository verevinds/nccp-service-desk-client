import React, { memo, useState, useEffect, useMemo, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
/** Typescript interface & type */
import { ISidebarWrapper } from '../Sidebar/interface';
import { IState, TIncident } from '../../interface';
/** Components */
import { IncidentContext } from '../Incident/IncidentContext';
import Sidebar from '../Sidebar/Sidebar';
import SidebarHistory from '../Sidebar/SidebarHistory';
import SidebarFilter, { TFilter } from '../SidebarFilter/SidebarFilter';
import SidebarTitle from '../SidebarTitle/SidebarTitle';
import SidebarSearch from '../SidebarSearch/SidebarSearch';
/** Styles */
import styles from './wrapperSidebar.module.css';

const SidebarWrapper: React.FC<ISidebarWrapper> = ({
  title,
  onClick,
  activeId,
  onClickHistory,
}) => {
  const { numberResponsible, incidents: initialIncidents, match } = useContext(IncidentContext);
  const filterState = useSelector((state: IState) => state.filter);
  const [blogTitle, setBlogTitle] = useState<JSX.Element | null>(null);
  const [anotherFilter, setAnotherFilter] = useState<any>(undefined);
  const [filter, setFilter] = useState<TFilter | undefined>();
  const [search, setSearch] = useState<any>([]);

  const incidents = useMemo(() => search, [search]);

  const responsibleList = useMemo(() => {
    if (numberResponsible) {
      return incidents
        ?.filter((item: TIncident) => item.currentResponsible === numberResponsible)
        .sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
    } else {
      return incidents.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
    }
  }, [incidents, numberResponsible]);

  const anotherList = useMemo(() => {
    if (Array.isArray(incidents)) {
      let newList = incidents
        .filter((item: TIncident) => item.currentResponsible !== numberResponsible)
        .sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
      if (filterState.categories || filterState.options || filterState.properties)
        if (
          filterState.categories.length ||
          filterState.options.length ||
          filterState.properties.length
        ) {
          let combineList: (TIncident | never)[][] = [];
          for (let key in filterState) {
            if (filterState[key].length) {
              filterState[key].forEach((element: any) => {
                const filterList = newList?.filter(
                  (item: TIncident) => item[key] === Number(element),
                );
                if (filterList) combineList.push(filterList);
              });
            }
          }
          let flatCombineList = combineList.flat();
          let uniqueFlatCombineList = Array.from(new Set(flatCombineList));

          return uniqueFlatCombineList;
        }

      return newList;
    }
  }, [incidents, numberResponsible, filterState]);

  useEffect(() => {
    if (title) {
      const newBlogTitle = <SidebarTitle title={title} />;
      setBlogTitle(newBlogTitle);
    }
  }, [title, incidents]);

  return (
    <Fragment>
      <Container>
        {blogTitle}
        {initialIncidents ? (
          <SidebarSearch {...{ incidents: initialIncidents, setSearch, search }} />
        ) : undefined}
        <div className={styles.block}>
          {responsibleList?.length ? (
            <Fragment>
              <br />
              <div className={styles.title}>
                {!numberResponsible ? <div></div> : <h6>Моя ответственность</h6>}
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

          {anotherList &&
          anotherList?.length &&
          (match.path === '/' || match.path === '/incident') ? (
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

          {!anotherList?.length && !responsibleList?.length ? (
            <h6 className='text-muted text-center'>
              <samp>cписок пустой</samp>
            </h6>
          ) : undefined}

          {!onClickHistory ? undefined : (
            <SidebarHistory onClick={onClick} activeId={activeId} onClickHistory={onClickHistory} />
          )}
        </div>
      </Container>
    </Fragment>
  );
};
export default memo(SidebarWrapper);
