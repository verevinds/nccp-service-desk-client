import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  Fragment,
  Dispatch,
  SetStateAction,
  useMemo,
  useLayoutEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Form, ListGroup } from 'react-bootstrap';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import SettingCatalogDepartment from '../SettingCatalogDepartment/SettingCatalogDepartment';
import SettingCatalogCategory from '../SettingCatalogCategory/SettingCatalogCategory';
import SettingCatalogProperty from '../SettingCatalogProperty/SettingCatalogProperty';
import SettingCatalogOption from '../SettingCatalogOption/SettingCatalogOption';
import { IState, TDepartment, TCategory, TProperty, TPosition } from '../../interface';
import ModalWindow from '../ModalWindow/ModalWindow';
import Axios from 'axios';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { findById } from '../../js/supportingFunction';

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
  handleRules?: (agr0: { id: number }) => void;
}
const SettingCatalog = () => {
  const dispatch = useDispatch();
  const { catalog }: IState = useSelector((state: IState) => state);
  const positions: TPosition[] = useSelector((state: IState) => state.positions.list);
  const [show, setShow] = useState(false);
  const [paramsRules, setParamsRules] = useState<{ [x: string]: number } | undefined>();
  const [departmentIdCurrent, setDepartmentIdCurrent] = useState<number | undefined>(undefined);
  const [categoryIdCurrent, setCategoryIdCurrent] = useState<number | undefined>(undefined);
  const [categoryList, setCategoryList] = useState<TCategory[] | undefined | never[]>(undefined);
  const [categorySubList, setCategorySubList] = useState<TCategory | undefined>(undefined);
  const [validated, setValidated] = useState(false);
  const [parentId, setParentId] = useState(0);
  const [childrenId, setChildrenId] = useState(0);
  const [positionId, setPositionId] = useState<string | undefined>();
  const [filter, setFilter] = useState('');
  const [rules, setRules] = useState<any[]>([]);
  const [isUpdateRules, setIsUpdateRules] = useState(false);

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
            level: Number(!findById(list, id)?.level),
          };
          break;
        case 'archive':
          data = {
            isArchive: Number(!findById(list, id)?.isArchive),
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

  /** SIDE EFFECTS*/
  useEffect(() => {
    let department: TDepartment | undefined = findById(catalog.department, departmentIdCurrent);
    let category: TCategory | undefined = department && findById(department.categories, categoryIdCurrent);
    setCategorySubList(category);
  }, [categoryIdCurrent, catalog, departmentIdCurrent]);

  useEffect(() => {
    let properties = categorySubList && categorySubList.properties;
    let parent: TProperty | undefined = properties && findById(properties, parentId);
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
  }, [parentId, childrenId, catalog, categorySubList, dispatch]);

  const handleRules = useCallback(
    (nameParams: string) => ({ id }: { id: number }) => {
      setRules([]);
      setParamsRules({ [`${nameParams}`]: id });
      setShow(true);
    },
    [],
  );
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      let rules = { ...paramsRules, positionId };

      dispatch(queryApi({ route: 'rules', method: 'post', data: rules }));
    }
    setValidated(true);
  };

  const filterPosition = useMemo(() => {
    let filterPosition = positions
      .filter((item: TPosition) => ~item.name.toLowerCase().indexOf(filter.toLowerCase()))
      .sort((a: TPosition, b: TPosition) => (a.name > b.name ? 1 : 0));

    setPositionId(String(filterPosition[0].id));

    return filterPosition;
  }, [positions, filter]);
  let PORT = window.location.protocol === 'http:' ? '8080' : '8433';
  const PATH = process.env.REACT_APP_URL || 'srv-sdesk.c31.nccp.ru';
  useLayoutEffect(() => {
    console.log('{ data: paramsRules }', { data: paramsRules });
    Axios.get(`${window.location.protocol}//${PATH}:${PORT}/api/rules/params`, { params: paramsRules }).then((res) => {
      setRules(res.data);
    });
    // eslint-disable-next-line
  }, [isUpdateRules, paramsRules]);

  return (
    <Fragment>
      <ModalWindow
        show={show}
        onHide={() => setShow(false)}
        onSubmit={onSubmit}
        validated={validated}
        textOk="Добавить"
      >
        <>
          <Form.Group>
            <Form.Control
              value={filter}
              onChange={(event: React.FormEvent<HTMLInputElement>) => setFilter(event.currentTarget.value)}
            />
            <Form.Text>Введите название должности</Form.Text>
          </Form.Group>
          <Form.Control
            as="select"
            required
            value={positionId}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setPositionId(event.currentTarget.value)}
          >
            {filterPosition.map((item: TPosition) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </Form.Control>

          <hr />
          <h6>Через согласование с</h6>
          <ListGroup variant="flush">
            {rules.map((item: any) => (
              <ListGroup.Item className="flex flex_between">
                {findById(positions, item?.positionId)?.name}
                <ButtonFontAwesome
                  variant="danger"
                  faIcon={faTrash}
                  onClick={() => {
                    Axios.delete(`${window.location.protocol}//${PATH}:${PORT}/api/rules/${item.id}`).then((res) => {
                      setIsUpdateRules(true);
                    });
                  }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      </ModalWindow>
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
          handleRules={handleRules('categoryId')}
        />
        {!!categorySubList ? (
          <SettingCatalogProperty
            categorySubList={categorySubList}
            handleEvent={handleEvent}
            handleBind={{ id: parentId, handleBind: handleBindParent, bindDelete: handleBindChild }}
            handleRules={handleRules('propertyId')}
          />
        ) : undefined}
        <SettingCatalogOption
          categorySubList={categorySubList}
          handleEvent={handleEvent}
          handleBind={{ id: childrenId, handleBind: handleBindChild }}
          handleRules={handleRules('optionId')}
        />
      </Row>
    </Fragment>
  );
};

export default memo(SettingCatalog);
