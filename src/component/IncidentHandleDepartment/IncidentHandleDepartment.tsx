import React, { memo, useState, useLayoutEffect } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import {
  IIncidentHandleDepartment,
  ICategory,
  IOption,
  IDepartment,
  IProperty,
} from './interface';
import { Form } from 'react-bootstrap';
import { useSelector, shallowEqual } from 'react-redux';

const IncidentHandleDepartment = ({
  show,
  onClick,
  onHide,
}: IIncidentHandleDepartment) => {
  const catalog = useSelector((state: any) => state.catalog, shallowEqual);
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  useLayoutEffect(() => {}, [catalog]);

  //**Получение листа отделов */
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);
  useLayoutEffect(() => {
    if (!!catalog && !!user) {
      if (!!catalog.department) {
        let department = catalog.department.filter(
          (item: any) => item.id !== user.departmentId,
        );
        setDepartmentList(department);
        setCurrentDepartmentId(department[0].id);
      }
    }
  }, [catalog, user]);

  //**Получение листа категорий */
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [categoryList, setCategoryList] = useState<ICategory[]>([
    {
      createdAt: '',
      departmentId: null,
      id: null,
      name: '',
      options: [],
      properties: [],
      updatedAt: '',
    },
  ]);
  useLayoutEffect(() => {
    let category = catalog.list.filter(
      (item: any) => item.departmentId === currentDepartmentId,
    );
    if (!!category.length) {
      setCategoryList(category);
      setCurrentCategoryId(category[0].id);
    }
  }, [currentDepartmentId, catalog.list]);

  //**Получение листа параметров и опций*/
  // Параметры
  const [currentPropertyId, setCurrentPropertyId] = useState<number | null>(
    null,
  );
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);

  // Опции
  const [currentOptionId, setCurrentOptionId] = useState<number | null>(null);
  const [optionList, setOptionList] = useState<IOption[]>([]);
  useLayoutEffect(() => {
    if (!!categoryList) {
      let currentCategory = categoryList.find(
        (item: any) => Number(item.id) === Number(currentCategoryId),
      );

      if (!!currentCategory) {
        if (!!currentCategory.properties.length) {
          setPropertyList(currentCategory.properties);
          setCurrentPropertyId(currentCategory.properties[0].id);
        }

        if (!!currentCategory.options.length) {
          setOptionList(currentCategory.options);
          setCurrentOptionId(currentCategory.options[0].id);
        }
      }
    }
  }, [currentCategoryId, categoryList]);

  /**Вывод всех выдранных категорий */
  // console.group('currentID');
  // console.log('currentDepartmentId', currentDepartmentId);
  // console.log('currentCategoryId', currentCategoryId);
  // console.log('currentPropertyId', currentPropertyId);
  // console.groupEnd();
  const jsxSelector = (
    title: string,
    defaultValue: number | null,
    setId: (val: any) => void,
    list: any,
  ) => {
    return (
      <>
        <Form.Group>
          <Form.Label>{title}</Form.Label>
          <Form.Control
            as="select"
            defaultValue={defaultValue}
            onChange={(event: any) => {
              setId(event.target.value);
            }}
          >
            {list.map((item: any) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </>
    );
  };
  return (
    <ModalWindow
      title={'Направить инцидент в отдел'}
      show={show}
      onHide={onHide}
      onOk={() => {
        onClick.call(null, null, '', {
          categoryId: currentCategoryId,
          propertyId: currentPropertyId,
          optionId: currentOptionId,
        });
      }}
      textOk={'Направить'}
    >
      <>
        {!!departmentList.length
          ? jsxSelector(
              'Отделы',
              currentDepartmentId,
              setCurrentDepartmentId,
              departmentList,
            )
          : undefined}

        {!!categoryList.length
          ? jsxSelector(
              'Категории',
              currentCategoryId,
              setCurrentCategoryId,
              categoryList,
            )
          : undefined}

        {!!propertyList.length
          ? jsxSelector(
              'Параметры',
              currentPropertyId,
              setCurrentPropertyId,
              propertyList,
            )
          : undefined}
        {!!optionList.length
          ? jsxSelector(
              'Опции',
              currentOptionId,
              setCurrentOptionId,
              optionList,
            )
          : undefined}
      </>
    </ModalWindow>
  );
};

export default memo(IncidentHandleDepartment);
