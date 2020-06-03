import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';
import {
  THandleEvent,
  TCategorySubList,
} from '../SettingCatalog/SettingCatalog';

export interface ISettingCatalogProperty extends THandleEvent {
  categorySubList: TCategorySubList;
}

const SettingCatalogProperty: React.FC<ISettingCatalogProperty> = ({
  categorySubList,
  handleEvent,
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
      xs={3}
    />
  );
};

export default memo(SettingCatalogProperty);
