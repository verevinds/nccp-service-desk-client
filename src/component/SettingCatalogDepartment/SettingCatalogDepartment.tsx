import React, { memo, Dispatch, SetStateAction } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import List from '../List/List';

export interface ISettingCatalogDepartment {
  setDepartmentIdCurrent: Dispatch<SetStateAction<number | undefined>>;
}

const SettingCatalogDepartment: React.FC<ISettingCatalogDepartment> = ({
  setDepartmentIdCurrent,
}) => {
  const { department } = useSelector(
    (state: any) => state.catalog,
    shallowEqual,
  );

  return (
    <List
      title={'Отделы'}
      list={department}
      onClick={setDepartmentIdCurrent}
      xs={3}
    />
  );
};

export default memo(SettingCatalogDepartment);
