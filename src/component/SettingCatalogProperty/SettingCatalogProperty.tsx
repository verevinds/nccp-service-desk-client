import React, { memo, useCallback, useState } from 'react';
import { THandleEvent } from '../SettingCatalog/SettingCatalog';
import { THandleBind } from '../List/ListItem';
import List from '../List/List';
import { TProperty, TCategory } from '../../interface';
import Axios from 'axios';
import ModalDeadline from './ModalDeadline';
import ModalTune from '../ModalTune/ModalTune';

export interface ISettingCatalogProperty extends THandleEvent {
  categorySubList: TCategory;
  handleBind: THandleBind;
}

const SettingCatalogProperty: React.FC<ISettingCatalogProperty> = ({ categorySubList, handleEvent, handleBind }) => {
  const route = 'properties';
  const [modalDeadline, setModalDeadline] = useState(false);
  const [modalTune, setModalTune] = useState(false);
  const [property, setProperty] = useState<TProperty | null>(null);
  const [id, setId] = useState(undefined);
  const handleDedline = useCallback(({ id }) => {
    setModalDeadline(true);
    let PORT = window.location.protocol === 'http:' ? '8080' : '8433';
    Axios.get(`${window.location.protocol}//srv-sdesk.c31.nccp.ru:${PORT}/api/properties/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, []);

  return (
    <>
      {!!modalDeadline ? (
        <ModalDeadline route={route} setShow={setModalDeadline} show={modalDeadline} property={property} />
      ) : undefined}
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
