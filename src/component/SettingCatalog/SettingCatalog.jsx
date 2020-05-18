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
    setCategoryList(
      category.filter((item) => item.departmentId === departmentIdCurrent),
    );
  }, [departmentIdCurrent, category]);
  // Обработчик состояния: хранит в себе id выбранной категории
  const [categoryIdCurrent, setCategoryIdCurrent] = useState();
  // Обработчик состояния: хранит в себе jsx компоненту
  const [categoryJsx, setCategoryJsx] = useState();
  const onSubmit = useCallback(
    function (event, value) {
      event = arguments[1];
      value = arguments[2];
      const { route } = arguments[0];
      event.preventDefault();
      if (value) {
        const data = {
          name: value,
          categoryId: categoryIdCurrent,
          departmentId: departmentIdCurrent,
        };
        dispatch(
          queryApi({
            method: 'post',
            route,
            actionUpdate: categoryUpdate,
            data,
          }),
        );
      }
    },
    [departmentIdCurrent, dispatch, categoryIdCurrent],
  );
  const onDelete = useCallback(
    function () {
      const { route } = arguments[0];
      const id = arguments[1];
      const conf = window.confirm(
        'Все инциденты связаные с этим удаляться. Вы точно хотите удалить?',
      );

      if (conf) {
        dispatch(
          queryApi({
            method: 'delete',
            actionUpdate: categoryUpdate,
            route,
            id,
          }),
        );
      }
    },
    [dispatch],
  );
  // Эффект отрисовки компонента
  useEffect(() => {
    if (departmentIdCurrent) {
      setCategoryJsx(
        <List
          title={'Категории'}
          list={categoryList}
          onSubmit={onSubmit.bind(null, { route: 'categories' })}
          onDelete={onDelete.bind(null, { route: 'categories' })}
          onClick={setCategoryIdCurrent}
          activeId={categoryIdCurrent}
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
      setPropertyJsx(
        <List
          title="Параметры"
          list={categorySubList.properties}
          onSubmit={onSubmit.bind(null, { route: 'properties' })}
          onDelete={onDelete.bind(null, { route: 'properties' })}
          xs={3}
        />,
      );
      setOptionJsx(
        <List
          title="Опции"
          list={categorySubList.options}
          onSubmit={onSubmit.bind(null, { route: 'options' })}
          onDelete={onDelete.bind(null, { route: 'options' })}
          xs={3}
        />,
      );
    } else {
      setPropertyJsx(null);
      setOptionJsx(null);
    }
  }, [categorySubList, onDelete, onSubmit]);

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
