import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';
import { useSelector, shallowEqual } from 'react-redux';
import { THandleEvent } from '../SettingCatalog/SettingCatalog';
import { IState, TDepartment, TCategory } from '../../interface';

export interface ISettingCatalogCategory extends THandleEvent {
  departmentIdCurrent?: number;
  categoryIdCurrent?: number;
  setCategoryIdCurrent: React.Dispatch<React.SetStateAction<number | undefined>>;
  categoryList: TCategory[] | undefined | [];
  setCategoryList: (arg0: TCategory[] | undefined | never[]) => void;
}

const SettingCatalogCategory: React.FC<ISettingCatalogCategory> = ({
  departmentIdCurrent,
  setCategoryIdCurrent,
  handleEvent,
  categoryIdCurrent,
  categoryList,
  setCategoryList,
  handleRules,
}) => {
  const departments = useSelector((state: IState) => state.catalog.department, shallowEqual);
  const [categoryJsx, setCategoryJsx] = useState<JSX.Element | undefined>();

  useEffect(() => {
    let department: TDepartment | undefined =
      departments && departments.find((item: any) => item.id === departmentIdCurrent);
    let updateCategory: TCategory[] | undefined | never[] = department && department.categories;

    setCategoryList(updateCategory);
  }, [departmentIdCurrent, departments, setCategoryList]);

  useEffect(() => {
    let newCategoryJsx;

    if (departmentIdCurrent && categoryList) {
      let route = 'categories';

      newCategoryJsx = (
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
          handleRules={handleRules}
          xs={3}
        />
      );
    }

    setCategoryJsx(newCategoryJsx);
  }, [departmentIdCurrent, categoryList, categoryIdCurrent, handleEvent, setCategoryIdCurrent]);
  return <> {categoryJsx}</>;
};

export default memo(SettingCatalogCategory);
