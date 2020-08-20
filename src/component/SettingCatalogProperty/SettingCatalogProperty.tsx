import React, { memo, useCallback, useState } from 'react';
import { THandleEvent } from '../SettingCatalog/SettingCatalog';
import { THandleBind } from '../ListItem/ListItem';
import List from '../List/List';
import { TProperty, TCategory, IState } from '../../interface';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import ModalDeadline from './ModalDeadline';

export interface ISettingCatalogProperty extends THandleEvent {
  categorySubList?: TCategory;
  handleBind: THandleBind;
}

const SettingCatalogProperty: React.FC<ISettingCatalogProperty> = ({
  categorySubList,
  handleEvent,
  handleBind,
  handleRules,
}) => {
  const route = 'properties';
  const { isFinishTime } = useSelector((state: IState) => state.setting);
  const [modalDeadline, setModalDeadline] = useState(false);
  const [property, setProperty] = useState<TProperty | null>(null);
  const handleDedline = useCallback(({ id }) => {
    setModalDeadline(true);
    let PORT = window.location.protocol === 'http:' ? '8080' : '8433';
    const PATH = process.env.REACT_APP_URL || 'srv-sdesk.c31.nccp.ru';

    Axios.get(`${window.location.protocol}//${PATH}:${PORT}/api/properties/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, []);

  return (
    <>
      {!!modalDeadline ? (
        <ModalDeadline
          route={route}
          setShow={setModalDeadline}
          show={modalDeadline}
          property={property}
        />
      ) : undefined}
      <List
        title='Параметры'
        list={categorySubList?.properties || []}
        onSubmit={handleEvent({ route })}
        onDelete={handleEvent({ route, fact: 'delete' })}
        onFavorites={handleEvent({
          route,
          list: categorySubList?.properties,
          fact: 'favorites',
        })}
        onArchive={handleEvent({
          route,
          list: categorySubList?.properties,
          fact: 'archive',
        })}
        handleBind={handleBind}
        handleDedline={isFinishTime ? handleDedline : undefined}
        handleRules={handleRules}
        xs={3}
      />
    </>
  );
};

export default memo(SettingCatalogProperty);
