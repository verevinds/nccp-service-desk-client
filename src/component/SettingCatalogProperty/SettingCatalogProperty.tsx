import React, { memo, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { THandleEvent, TCategorySubList } from '../SettingCatalog/SettingCatalog';
import { THandleBind } from '../List/ListItem';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../List/List';
import { TProperty } from '../../interface';
import Axios from 'axios';
import { Form } from 'react-bootstrap';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';

export interface ISettingCatalogProperty extends THandleEvent {
  categorySubList: TCategorySubList;
  handleBind: THandleBind;
}

const SettingCatalogProperty: React.FC<ISettingCatalogProperty> = ({ categorySubList, handleEvent, handleBind }) => {
  const route = 'properties';
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [property, setProperty] = useState<TProperty | null>(null);
  const [deadline, setDeadline] = useState(1);
  const handleDedline = useCallback(({ id }) => {
    setShow(true);
    Axios.get(`https://srv-sdesk.c31.nccp.ru:8443/api/properties/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, []);

  const onClick = useCallback(() => {
    dispatch(
      queryApi({
        route,
        method: 'put',
        data: { deadline },
        actionUpdate: categoryUpdate,
        id: property?.id,
      }),
    );
    setShow(false);
  }, [deadline, property, route, dispatch]);

  useEffect(() => {
    property && setDeadline(property.deadline);
  }, [property]);

  return (
    <>
      <ModalWindow
        show={show}
        title="Срок выполнения"
        onHide={() => setShow(false)}
        onOk={onClick}
        textOk={'Сохранить'}
        size={'sm'}
      >
        <Form.Group controlId="formBasicRange">
          <Form.Label>Параметр: {property?.name}</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={deadline}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setDeadline(Number(event.currentTarget.value));
            }}
          />
          <br />
          <Form.Control
            type="range"
            min={1}
            value={deadline}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setDeadline(Number(event.currentTarget.value));
            }}
          />
        </Form.Group>
      </ModalWindow>
      <List
        title="Параметры"
        list={categorySubList?.properties}
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
        handleBind={handleBind}
        handleDedline={handleDedline}
        xs={3}
      />
    </>
  );
};

export default memo(SettingCatalogProperty);
