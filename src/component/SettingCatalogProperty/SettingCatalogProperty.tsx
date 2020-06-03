import React, { memo } from 'react';
import List from '../List/List';
import {
  THandleEvent,
  TCategorySubList,
} from '../SettingCatalog/SettingCatalog';
import { THandleBind } from '../List/ListItem';

export interface ISettingCatalogProperty extends THandleEvent {
  categorySubList: TCategorySubList;
  handleBind: THandleBind;
}

const SettingCatalogProperty: React.FC<ISettingCatalogProperty> = ({
  categorySubList,
  handleEvent,
  handleBind,
}) => {
  let route = 'properties';
  return (
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
      xs={3}
    />
  );
};

export default memo(SettingCatalogProperty);
