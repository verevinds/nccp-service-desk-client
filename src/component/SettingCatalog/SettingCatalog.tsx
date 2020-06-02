import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import { Row } from 'react-bootstrap';
import SettingCatalogDepartment from '../SettingCatalogDepartment/SettingCatalogDepartment';
import SettingCatalogCategory from '../SettingCatalogCategory/SettingCatalogCategory';
import SettingCatalogProperty from '../SettingCatalogProperty/SettingCatalogProperty';

export type TFn = {
  id?: number;
  value?: string;
};
type THandleEventParams = {
  route: string;
  list?: [] | never[];
  fact?: string;
  setCurrent?: Dispatch<SetStateAction<number | undefined>>;
};
export interface THandleEvent {
  handleEvent: ({
    route,
    list,
    setCurrent,
    fact,
  }: THandleEventParams) => ({ id, value }: TFn) => void;
}

export type TCategorySubList = {
  id: number;
  name: string;
  departmentId: number;
  level: number;
  isArchive: boolean;
  deadline: number;
  createdAt: string;
  updatedAt: string;
  properties: [];
  options: [];
};

const SettingCatalog = () => {
  const dispatch = useDispatch();
  const [departmentIdCurrent, setDepartmentIdCurrent] = useState<
    number | undefined
  >(undefined);
  const [categoryIdCurrent, setCategoryIdCurrent] = useState<
    number | undefined
  >(undefined);
  const [categoryList, setCategoryList] = useState([]);
  const [categorySubList, setCategorySubList] = useState<
    TCategorySubList | undefined
  >(undefined);

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
            isArchive: Number(
              !list.find((item: any) => item.id === id).isArchive,
            ),
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
    setCategorySubList(
      categoryList.find((item: any) => item.id === categoryIdCurrent),
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
          setCategoryIdCurrent={setCategoryIdCurrent}
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
