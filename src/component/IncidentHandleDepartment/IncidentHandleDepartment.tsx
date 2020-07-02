import React, { memo, useState, useLayoutEffect, useEffect, useContext } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IIncidentHandleDepartment, ICategory, IOption, IDepartment, IProperty } from './interface';
import { Form } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';
import { IState } from '../../interface';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';

const IncidentHandleDepartment = ({ show, onHide }: IIncidentHandleDepartment) => {
  const catalog = useSelector((state: IState) => state.catalog, shallowEqual);
  const user = useSelector((state: IState) => state.auth.user, shallowEqual);
  const { id } = useSelector((state: IState) => state.incidents.current.incident, shallowEqual);
  const { onClick } = useContext(IncidentWindowContext);
  useLayoutEffect(() => {}, [catalog]);

  //**Получение листа отделов */
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);
  useLayoutEffect(() => {
    if (!!catalog && !!user) {
      if (!!catalog.department) {
        let department = catalog.department.filter(
          (item: any) => item.id !== user.departmentId && item.categories.length,
        );
        setDepartmentList(department);
        setCurrentDepartmentId(department[0].id);
      }
    }
  }, [catalog, user]);

  //**Получение листа категорий */
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  useEffect(() => {
    let category = catalog.list.filter((item: any) => Number(item.departmentId) === Number(currentDepartmentId));
    if (!!category.length) {
      setCategoryList(category);
      setCurrentCategoryId(category[0].id);
    } else {
      setCategoryList([]);
      setCurrentCategoryId(null);
    }
  }, [currentDepartmentId, catalog.list]);

  //**Получение листа параметров и опций*/
  // Параметры
  const [currentPropertyId, setCurrentPropertyId] = useState<number | null>(null);
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);

  // Опции
  const [currentOptionId, setCurrentOptionId] = useState<number | null>(null);
  const [optionList, setOptionList] = useState<IOption[]>([]);
  useEffect(() => {
    if (!!categoryList) {
      let currentCategory = categoryList.find((item: any) => Number(item.id) === Number(currentCategoryId));

      if (!!currentCategory) {
        if (!!currentCategory.properties.length) {
          setPropertyList(currentCategory.properties);
          setCurrentPropertyId(currentCategory.properties[0].id);
        } else {
          setPropertyList([]);
          setCurrentPropertyId(null);
        }

        if (!!currentCategory.options.length) {
          setOptionList(currentCategory.options);
          setCurrentOptionId(currentCategory.options[0].id);
        } else {
          setOptionList([]);
          setCurrentOptionId(null);
        }
      }
    }
  }, [currentCategoryId, categoryList]);

  /**Вывод всех выдранных категорий */
  // console.group('currentID');
  // console.log('currentDepartmentId', currentDepartmentId);
  // console.log('currentCategoryId', currentCategoryId);
  // console.log('currentPropertyId', currentPropertyId);
  // console.log('currentOptionId', currentOptionId);
  // console.groupEnd();
  const jsxSelector = (title: string, defaultValue: number | null, setId: (val: any) => void, list: any) => {
    return (
      <>
        <Form.Group>
          <Form.Label>{title}</Form.Label>
          <Form.Control
            as="select"
            defaultValue={'defaultValue'}
            onChange={(event: any) => {
              setId(event.target.value);
            }}
          >
            {list
              .sort((a: any, b: any) => {
                if (b.name < a.name) {
                  return 1;
                } else {
                  return -1;
                }
              })
              .map((item: any) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </>
    );
  };
  const matchHandle = {
    method: 'post',
    data: {
      code: 2,
      incidentId: id,
      params: {
        departmentId: currentDepartmentId,
        categoryId: currentCategoryId,
        propertyId: currentPropertyId,
        optionId: currentOptionId,
        currentResponsible: null,
      },
    },
  };

  return (
    <ModalWindow
      title={'Передать заявку'}
      show={show}
      onHide={onHide}
      onOk={onClick.bind({
        comment: `${user.name1} ${user.name2.charAt(0)} ${user.name3.charAt(0)} передал заявку в "${
          departmentList.find((item: any) => Number(item.id) === Number(currentDepartmentId))?.name
        }"`,
        matchHandle,
      })}
      textOk={'Передать'}
    >
      <>
        {!!departmentList.length
          ? jsxSelector('Отделы', currentDepartmentId, setCurrentDepartmentId, departmentList)
          : undefined}

        {!!categoryList.length
          ? jsxSelector('Категории', currentCategoryId, setCurrentCategoryId, categoryList)
          : undefined}

        {!!propertyList.length
          ? jsxSelector('Параметры', currentPropertyId, setCurrentPropertyId, propertyList)
          : undefined}
        {!!optionList.length ? jsxSelector('Опции', currentOptionId, setCurrentOptionId, optionList) : undefined}
      </>
    </ModalWindow>
  );
};

export default memo(IncidentHandleDepartment);
