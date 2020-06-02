import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';
import { useSelector, shallowEqual } from 'react-redux';

export interface ISettingCatalogCategory {
  departmentIdCurrent: number;
  categoryIdCurrent: number;
  setCategoryIdCurrent: () => void;
  categoryList: [];
  setCategoryList: (arg0: []) => void;
  handleEvent: (
    arg0: THandleEventParams,
  ) => ((val: { id?: number; value?: string }) => void) | undefined;
}
type THandleEventParams = {
  route: string;
  list?: [];
  fact?: string;
  setCurrent?: () => void;
};
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
