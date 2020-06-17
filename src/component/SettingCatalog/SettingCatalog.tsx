import React, { memo, useEffect, useState, useCallback, Fragment, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Row } from 'react-bootstrap';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import SettingCatalogDepartment from '../SettingCatalogDepartment/SettingCatalogDepartment';
import SettingCatalogCategory from '../SettingCatalogCategory/SettingCatalogCategory';
import SettingCatalogProperty from '../SettingCatalogProperty/SettingCatalogProperty';
import SettingCatalogOption from '../SettingCatalogOption/SettingCatalogOption';
import { TItemTag } from '../List/ListItemTag';
import { IState, TDepartment, TCategory, TProperty } from '../../interface';

export type TFn = {
  id?: number;
  value?: string;
};
type THandleEventParams = {
  route: string;
  list?: any[];
  fact?: string;
  setCurrent?: Dispatch<SetStateAction<number | undefined>>;
};
export interface THandleEvent {
  handleEvent: ({ route, list, setCurrent, fact }: THandleEventParams) => ({ id, value }: TFn) => void;
}

// export type TCategorySubList = {
//   id: number;
//   name: string;
//   departmentId: number;
//   level: number;
//   isArchive: boolean;
//   deadline: number;
//   createdAt: string;
//   updatedAt: string;
//   properties: [];
//   options: [];
// };
// export type TProperty = {
//   bind: TItemTag[];
//   [key: string]: any;
//   categoryId: number;
//   deadline: number;
//   id: number;
//   isArchive: boolean;
//   level: number | null;
//   name: string;
//   priorityId: number | null;
// };
const SettingCatalog = () => {
  const dispatch = useDispatch();
  const { catalog }: IState = useSelector((state: IState) => state);
  const [departmentIdCurrent, setDepartmentIdCurrent] = useState<number | undefined>(undefined);
  const [categoryIdCurrent, setCategoryIdCurrent] = useState<number | undefined>(undefined);
  const [categoryList, setCategoryList] = useState<TCategory[] | undefined | never[]>(undefined);
  const [categorySubList, setCategorySubList] = useState<TCategory | undefined>(undefined);

  //** CALLBACKS */
  const handleEvent = useCallback(
    ({ route, list, setCurrent, fact }) => ({ id, value }: TFn) => {
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
            level: Number(!list.find((item: any) => item.id === id).level),
          };
          break;
        case 'archive':
          data = {
            isArchive: Number(!list.find((item: any) => item.id === id).isArchive),
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

  /** SIDE EFFECTS*/
  useEffect(() => {
    let department: TDepartment | undefined = catalog.department.find((item: any) => item.id === departmentIdCurrent);
    let category: TCategory | undefined =
      department && department.categories.find((item: any) => item.id === categoryIdCurrent);
    setCategorySubList(category);
  }, [categoryIdCurrent, catalog, departmentIdCurrent]);

  const [parentId, setParentId] = useState(0);
  const [childrenId, setChildrenId] = useState(0);
  const handleBindParent = useCallback(
    (id: number) => {
      setParentId(id);
    },
    [setParentId],
  );
  const handleBindChild = useCallback(
    (id: number) => {
      setChildrenId(id);
    },
    [setChildrenId],
  );

  useEffect(() => {
    let properties = categorySubList && categorySubList.properties;
    let parent: TProperty | undefined = properties && properties.find((item: TProperty) => item.id === parentId);
    if (parent && !!childrenId && !!parentId) {
      let bindId = 0;
      //@ts-ignore
      parent?.bind.forEach((item, index) => {
        if (item.item.id === childrenId) {
          bindId = item.id;
        }
      });

      if (!!bindId) {
        dispatch(
          queryApi({
            route: 'properties/bind',
            actionUpdate: categoryUpdate,
            method: 'delete',
            id: bindId,
          }),
        );
      } else {
        dispatch(
          queryApi({
            route: 'properties/bind',
            actionUpdate: categoryUpdate,
            method: 'post',
            data: {
              optionId: childrenId,
              propertyId: parentId,
            },
          }),
        );
      }
      setChildrenId(0);
    }
  }, [parentId, childrenId, categorySubList, dispatch]);

  useEffect(() => {
    console.log(categorySubList);
  }, [categorySubList]);

  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);
  return (
    <Fragment>
      <h2>Каталог</h2>
      <Row>
        <SettingCatalogDepartment setDepartmentIdCurrent={setDepartmentIdCurrent} />
        <SettingCatalogCategory
          categoryIdCurrent={categoryIdCurrent}
          setCategoryIdCurrent={setCategoryIdCurrent}
          categoryList={categoryList}
          departmentIdCurrent={departmentIdCurrent}
          handleEvent={handleEvent}
          setCategoryList={setCategoryList}
        />
        {!!categorySubList ? (
          <SettingCatalogProperty
            categorySubList={categorySubList}
            handleEvent={handleEvent}
            handleBind={{ id: parentId, handleBind: handleBindParent, bindDelete: handleBindChild }}
          />
        ) : undefined}
        <SettingCatalogOption
          categorySubList={categorySubList}
          handleEvent={handleEvent}
          handleBind={{ id: childrenId, handleBind: handleBindChild }}
        />
      </Row>
    </Fragment>
  );
};

export default memo(SettingCatalog);
