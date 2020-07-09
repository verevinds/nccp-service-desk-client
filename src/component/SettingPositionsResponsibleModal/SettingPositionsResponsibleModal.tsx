import React, { memo, Fragment, useEffect, FormEvent, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IState, TUser, TResponsible, TDepartment, TCategory, TProperty, TOption, IResponsible } from '../../interface';
import { Form, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { responsibleRequestSuccessed, responsibleUpdate } from '../../redux/actionCreators/responsibleAction';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
export interface ISettingPositionsResponsibleModal {
  show: boolean;
  setShow: (agr0: boolean) => void;
  id: number;
}

const SettingPositionsResponsibleModal: React.FC<ISettingPositionsResponsibleModal> = ({ show, setShow, id }) => {
  const user: TUser = useSelector((state: IState) => state.auth.user);
  const responsibles: IResponsible = useSelector((state: IState) => state.responsible);
  const departments: TDepartment[] = useSelector((state: IState) => state.catalog.department);
  const dispatch = useDispatch();

  const [arrayProperty, setArrayProperty] = useState<any[]>([]);
  const [arrayOption, setArrayOption] = useState<any[]>([]);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [optionId, setOptionId] = useState<string | null>(null);
  const [responsible, setResponsible] = useState<TResponsible>({
    departmentId: user.departmentId,
    positionId: null,
    userNumber: null,
    categoryId: null,
    propertyId: null,
    optionId: null,
  });
  useEffect(() => {
    setResponsible({ ...responsible, positionId: id });
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    console.log('responsibles', responsibles);
    // eslint-disable-next-line
  }, [responsibles]);
  useEffect(() => {
    const PORT = window.location.protocol === 'http:' ? '8080' : '8433';
    const PATH = process.env.REACT_APP_URL || 'srv-sdesk.c31.nccp.ru';

    Axios.get(`http://${PATH}:${PORT}/api/options`).then((res: any) => {
      setArrayOption(res.data);
    });
    Axios.get(`http://${PATH}:${PORT}/api/properties`).then((res: any) => {
      setArrayProperty(res.data);
    });
  }, []);

  const categories: TCategory[] | undefined = useMemo(() => {
    return departments.find((item: TDepartment) => item.id === responsible.departmentId)?.categories;
  }, [departments, responsible]);
  const properties = useMemo(() => {
    if (!!categoryId) return categories?.find((item: TCategory) => item.id === Number(categoryId))?.properties;
  }, [categories, categoryId]);
  const options = useMemo(() => {
    if (!!categoryId) return categories?.find((item: TCategory) => item.id === Number(categoryId))?.options;
  }, [categories, categoryId]);

  useEffect(() => {
    if (id)
      dispatch(
        queryApi({ route: 'responsibles', actionSuccessed: responsibleRequestSuccessed, params: { positionId: id } }),
      );
  }, [dispatch, responsibles.isUpdate, id]);

  const sendResponsible = useCallback(
    (data) => {
      dispatch(
        queryApi({
          route: 'responsibles',
          method: 'post',
          actionUpdate: responsibleUpdate,
          data: { positionId: id, ...data },
        }),
      );
    },
    [dispatch, id],
  );

  return (
    <ModalWindow show={show} onHide={() => setShow(false)} title="Редактировать ответственность">
      <Fragment>
        <Form.Group>
          <Form.Label>Категории</Form.Label>
          <div className="flex flex_between">
            <Form.Control
              as="select"
              defaultValue=""
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setCategoryId(!!event.currentTarget.value ? event.currentTarget.value : null)
              }
            >
              <option value={''}>Выберите</option>
              {categories?.map((item: TCategory, index: number) => (
                <option key={index} value={item.id}>{`${item.name}`}</option>
              ))}
            </Form.Control>
            {!!categoryId ? (
              <ButtonFontAwesome
                faIcon={faPlus}
                onClick={() => {
                  // setResponsible({ ...responsible, categoryId });
                  sendResponsible({ categoryId });
                }}
                tooltip="Добавить эту категорию в ответственность"
              />
            ) : undefined}
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Параметры</Form.Label>
          <div className="flex flex_between">
            <Form.Control
              as="select"
              defaultValue=""
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPropertyId(!!event.currentTarget.value ? event.currentTarget.value : null)
              }
            >
              <option value={''}>Выберите</option>
              {properties?.map((item: TProperty, index: number) => (
                <option key={index} value={item.id}>{`${item.name}`}</option>
              ))}
            </Form.Control>
            {!!propertyId ? (
              <ButtonFontAwesome
                faIcon={faPlus}
                onClick={() => {
                  // setResponsible({ ...responsible, propertyId });
                  sendResponsible({ propertyId });
                }}
                tooltip="Добавить этот параметр в ответственность"
              />
            ) : undefined}
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Опции</Form.Label>
          <div className="flex flex_between">
            <Form.Control
              as="select"
              defaultValue=""
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setOptionId(!!event.currentTarget.value ? event.currentTarget.value : null)
              }
            >
              <option value={''}>Выберите</option>
              {options?.map((item: TOption, index: number) => (
                <option key={index} value={item.id}>{`${item.name}`}</option>
              ))}
            </Form.Control>
            {!!optionId ? (
              <ButtonFontAwesome
                faIcon={faPlus}
                onClick={() => {
                  // setResponsible({ ...responsible, optionId });
                  sendResponsible({ optionId });
                }}
                tooltip="Добавить эту опцию в ответственность"
              />
            ) : undefined}
          </div>
        </Form.Group>
        <hr />
        <ListGroup>
          {!Array.isArray(responsibles?.list)
            ? undefined
            : responsibles?.list?.map((item: TResponsible, index: number) => (
                <ListGroup.Item className="flex flex_row flex_between" key={index}>
                  {categories?.find((elem: TCategory) => elem.id === Number(item.categoryId))}{' '}
                  {arrayProperty?.find((elem: TProperty) => elem.id === Number(item.propertyId))?.name}{' '}
                  {arrayOption?.find((elem: TOption) => elem.id === Number(item.optionId))?.name}
                  <ButtonFontAwesome
                    variant={'danger'}
                    faIcon={faTrash}
                    onClick={() =>
                      dispatch(
                        queryApi({
                          route: 'responsibles',
                          method: 'delete',
                          actionUpdate: responsibleUpdate,
                          id: item.id,
                        }),
                      )
                    }
                  />
                </ListGroup.Item>
              ))}
        </ListGroup>
      </Fragment>
    </ModalWindow>
  );
};

export default memo(SettingPositionsResponsibleModal);
