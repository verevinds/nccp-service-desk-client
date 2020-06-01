import React, { memo, useEffect, useState, useCallback } from 'react';
import List from '../List/List';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import { Row } from 'react-bootstrap';

const SettingCatalog = (props) => {
  const dispatch = useDispatch();
  /** ОТДЕЛ */
  // Получаем данные об отделах из стореджа */
  const { department } = useSelector((state) => state.catalog, shallowEqual);
  // Обработчик состояния: хранит текущее значение выделенного отдела */
  const [departmentIdCurrent, setDepartmentIdCurrent] = useState();

  /** КАТЕГОРИИ */
  // Получаем данные об категориях из стореджа */
  const category = useSelector((state) => state.catalog.list, shallowEqual);
  // Обработчик состояния: хранит текущий лист категорий принадлежащих выбранному отделу */
  const [categoryList, setCategoryList] = useState([]);
  // Изменяет текущий лист категорий, если изменился ID отдела или обновились данные в категориях
  useEffect(() => {
    let updateCategory = category.filter(
      (item) => item.departmentId === departmentIdCurrent,
    );
    setCategoryList(updateCategory);
  }, [departmentIdCurrent, category]);
  // Обработчик состояния: хранит в себе id выбранной категории
  const [categoryIdCurrent, setCategoryIdCurrent] = useState();
  // Обработчик состояния: хранит в себе jsx компоненту
  const [categoryJsx, setCategoryJsx] = useState();

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

  // Эффект отрисовки компонента
  useEffect(() => {
    if (departmentIdCurrent) {
      let route = 'categories';
      setCategoryJsx(
        <List
          title={'Категории'}
          list={categoryList}
          onClick={setCategoryIdCurrent}
          activeId={categoryIdCurrent}
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

  /** Параметры и Опции */
  const [categorySubList, setCategorySubList] = useState(null);
  useEffect(() => {
    setCategorySubList(
      categoryList.find((item) => item.id === categoryIdCurrent),
    );
  }, [categoryIdCurrent, categoryList]);
  const [propertyJsx, setPropertyJsx] = useState();
  const [optionJsx, setOptionJsx] = useState();
  useEffect(() => {
    if (categorySubList) {
      let route = 'properties';
      setPropertyJsx(
        <List
          title="Параметры"
          list={categorySubList.properties}
          onSubmit={handleEvent({ route })}
          onDelete={handleEvent({ route, fact: 'delete' })}
          onFavorites={handleEvent({
            route,
            list: categorySubList.properties,
            fact: 'favorites',
          })}
          onArchive={handleEvent({
            route,
            list: categorySubList.properties,
            fact: 'archive',
          })}
          xs={3}
        />,
      );
      route = 'options';
      setOptionJsx(
        <List
          title="Опции"
          list={categorySubList.options}
          onSubmit={handleEvent({ route })}
          onDelete={handleEvent({ route, fact: 'delete' })}
          onFavorites={handleEvent({
            route,
            list: categorySubList.options,
            fact: 'favorites',
          })}
          onArchive={handleEvent({
            route,
            list: categorySubList.options,
            fact: 'archive',
          })}
          xs={3}
        />,
      );
    } else {
      setPropertyJsx(null);
      setOptionJsx(null);
    }
  }, [categorySubList, handleEvent]);

  return (
    <>
      <h2>Каталог</h2>
      <Row>
        <List
          title={'Отделы'}
          list={department}
          onClick={setDepartmentIdCurrent}
          activeId={departmentIdCurrent}
          xs={3}
        />
        {categoryJsx}
        {propertyJsx}
        {optionJsx}
      </Row>
    </>
  );
};

export default memo(SettingCatalog);
