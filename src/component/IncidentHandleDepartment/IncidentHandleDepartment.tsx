import React, { memo, useState, useLayoutEffect, useEffect, useContext } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IIncidentHandleDepartment } from './interface';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IState, TUser, TCatalog, TDepartment, TCategory, TProperty, TOption } from '../../interface';
import { useCallback } from 'react';
import { AppContext } from '../../AppContext';
import { IApi } from '../../js/api';

const IncidentHandleDepartment = ({ show, onHide }: IIncidentHandleDepartment) => {
  const catalog: TCatalog = useSelector((state: IState) => state.catalog);
  const { departmentId: userDepartmentId }: TUser = useSelector((state: IState) => state.auth.user);
  const { id } = useSelector((state: IState) => state.incidents.current.incident);
  const incident = useSelector((state: IState) => state.incidents.current.incident);
  const { apiDispatch } = useContext(AppContext);

  //**Получение листа отделов */
  const [currentDepartmentId, setCurrentDepartmentId] = useState<number | undefined>();
  const [departmentList, setDepartmentList] = useState<TDepartment[]>([]);
  useLayoutEffect(() => {
    if (!!catalog && !!userDepartmentId) {
      if (!!catalog.department) {
        let department = catalog.department.filter(
          (item: any) => item.id !== userDepartmentId && item.categories.length,
        );
        setDepartmentList(department);
        setCurrentDepartmentId(department[0].id);
      }
    }
  }, [catalog, userDepartmentId]);

  //**Получение листа категорий */
  const [currentCategoryId, setCurrentCategoryId] = useState<number | undefined>();
  const [categoryList, setCategoryList] = useState<TCategory[]>([]);
  useEffect(() => {
    let category = catalog.list.filter((item: any) => Number(item.departmentId) === Number(currentDepartmentId));
    if (!!category.length) {
      setCategoryList(category);
      setCurrentCategoryId(category[0].id);
    } else {
      setCategoryList([]);
      setCurrentCategoryId(undefined);
    }
  }, [currentDepartmentId, catalog.list]);

  //**Получение листа параметров и опций*/
  // Параметры
  const [currentPropertyId, setCurrentPropertyId] = useState<number | undefined>();
  const [propertyList, setPropertyList] = useState<TProperty[]>([]);

  // Опции
  const [currentOptionId, setCurrentOptionId] = useState<number | undefined>();
  const [optionList, setOptionList] = useState<TOption[]>([]);
  useEffect(() => {
    if (!!categoryList) {
      let currentCategory = categoryList.find((item: any) => Number(item.id) === Number(currentCategoryId));

      if (!!currentCategory) {
        if (!!currentCategory.properties.length) {
          setPropertyList(currentCategory.properties);
          setCurrentPropertyId(currentCategory.properties[0].id);
        } else {
          setPropertyList([]);
          setCurrentPropertyId(undefined);
        }

        if (!!currentCategory.options.length) {
          setOptionList(currentCategory.options);
          setCurrentOptionId(currentCategory.options[0].id);
        } else {
          setOptionList([]);
          setCurrentOptionId(undefined);
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
  const jsxSelector = (title: string, defaultValue: number, setId: (val: any) => void, list: any) => {
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

  const onClick = useCallback(
    function (this: IApi) {
      if (incident) {
        const text = `Назначен перевод в "${
          departmentList.find((item: TDepartment) => Number(item.id) === Number(currentDepartmentId))?.name
        }". Перевод осуществится после согласования руководителя.`;

        this.comments().post({ data: { incidentId: incident?.id, text } });
        this.matches().post(matchHandle);
      }
    },
    [matchHandle, currentDepartmentId, departmentList, incident],
  );

  return (
    <ModalWindow
      title={'Передать заявку'}
      show={show}
      onHide={onHide}
      onOk={onClick.bind(apiDispatch)}
      textOk={'Передать'}
    >
      <>
        {!!departmentList.length && currentDepartmentId
          ? jsxSelector('Отделы', currentDepartmentId, setCurrentDepartmentId, departmentList)
          : undefined}

        {!!categoryList.length && currentCategoryId
          ? jsxSelector('Категории', currentCategoryId, setCurrentCategoryId, categoryList)
          : undefined}

        {!!propertyList.length && currentPropertyId
          ? jsxSelector('Параметры', currentPropertyId, setCurrentPropertyId, propertyList)
          : undefined}
        {!!optionList.length && currentOptionId
          ? jsxSelector('Опции', currentOptionId, setCurrentOptionId, optionList)
          : undefined}
      </>
    </ModalWindow>
  );
};

export default memo(IncidentHandleDepartment);
