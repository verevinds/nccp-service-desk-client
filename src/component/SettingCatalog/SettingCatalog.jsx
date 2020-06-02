import React, { memo, useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import { Row } from 'react-bootstrap';
import SettingCatalogDepartment from '../SettingCatalogDepartment/SettingCatalogDepartment';
import SettingCatalogCategory from '../SettingCatalogCategory/SettingCatalogCategory';
import SettingCatalogProperty from '../SettingCatalogProperty/SettingCatalogProperty';

const SettingCatalog = () => {
  const dispatch = useDispatch();
  const [departmentIdCurrent, setDepartmentIdCurrent] = useState();
  const [categoryIdCurrent, setCategoryIdCurrent] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [categorySubList, setCategorySubList] = useState(null);

  const handleEvent = useCallback(
    ({ route, list, setCurrent, fact }) => ({ id, value }) => {
      let data;
      let method = 'put';
      if (value) {
        data = {
          name: value,
          categoryId: categoryIdCurrent,
          departmentId: departmentIdCurrent,
        };
      }
      switch (fact) {
        case 'favorites':
          data = {
            level: Number(!list.find((item) => item.id === id).level),
          };
          break;
        case 'archive':
          data = {
            isArchive: Number(!list.find((item) => item.id === id).isArchive),
          };
          if (setCurrent) setCurrent(undefined);
          break;
        case 'delete':
          method = 'delete';
          break;
        default:
          method = 'post';
          break;
      }

      dispatch(
        queryApi({
          id,
          actionUpdate: categoryUpdate,
          route,
          method,
          data,
        }),
      );
    },
    [categoryIdCurrent, departmentIdCurrent, dispatch],
  );

  /** Параметры и Опции */
  useEffect(() => {
    setCategorySubList(
      categoryList.find((item) => item.id === categoryIdCurrent),
    );
  }, [categoryIdCurrent, categoryList]);

  return (
    <Fragment>
      <h2>Каталог</h2>
      <Row>
        <SettingCatalogDepartment
          setDepartmentIdCurrent={setDepartmentIdCurrent}
        />
        <SettingCatalogCategory
          categoryIdCurrent={categoryIdCurrent}
          onClick={setCategoryIdCurrent}
          categoryList={categoryList}
          departmentIdCurrent={departmentIdCurrent}
          handleEvent={handleEvent}
          setCategoryList={setCategoryList}
        />
        <SettingCatalogProperty
          categorySubList={categorySubList}
          handleEvent={handleEvent}
        />
      </Row>
    </Fragment>
  );
};

export default memo(SettingCatalog);
