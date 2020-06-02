import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';
import { useSelector, shallowEqual } from 'react-redux';
import { THandleEvent } from '../SettingCatalog/SettingCatalog';

export interface ISettingCatalogCategory extends THandleEvent {
  departmentIdCurrent?: number;
  categoryIdCurrent?: number;
  setCategoryIdCurrent: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  categoryList?: [] | never[];
  setCategoryList: (arg0: []) => void;
}

const SettingCatalogCategory: React.FC<ISettingCatalogCategory> = ({
  departmentIdCurrent,
  setCategoryIdCurrent,
  handleEvent,
  categoryIdCurrent,
  categoryList,
  setCategoryList,
}) => {
  const category = useSelector(
    (state: any) => state.catalog.list,
    shallowEqual,
  );
  useEffect(() => {
    let updateCategory: [] = category.filter(
      (item: any) => item.departmentId === departmentIdCurrent,
    );
    setCategoryList(updateCategory);
  }, [departmentIdCurrent, category, setCategoryList]);
  const [categoryJsx, setCategoryJsx] = useState<JSX.Element | undefined>();
  // Эффект отрисовки компонента
  useEffect(() => {
    if (departmentIdCurrent) {
      let route = 'categories';
      setCategoryJsx(
        <List
          title={'Категории'}
          list={categoryList}
          onClick={setCategoryIdCurrent}
          onSubmit={handleEvent({ route })}
          onDelete={handleEvent({ route, fact: 'delete' })}
          onFavorites={handleEvent({
            route,
            list: categoryList,
            fact: 'favorites',
          })}
          onArchive={handleEvent({
            route,
            list: categoryList,
            fact: 'archive',
            setCurrent: setCategoryIdCurrent,
          })}
          xs={3}
        />,
      );
    }
    // eslint-disable-next-line
  }, [departmentIdCurrent, categoryList, categoryIdCurrent]);
  return <> {categoryJsx}</>;
};

export default memo(SettingCatalogCategory);
