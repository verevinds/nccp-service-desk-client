import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';
import {
  THandleEvent,
  TCategorySubList,
} from '../SettingCatalog/SettingCatalog';

export interface ISettingCatalogProperty extends THandleEvent {
  categorySubList?: TCategorySubList;
}

const SettingCatalogProperty: React.FC<ISettingCatalogProperty> = ({
  categorySubList,
  handleEvent,
}) => {
  const [propertyJsx, setPropertyJsx] = useState<JSX.Element | undefined>();
  useEffect(() => {
    if (categorySubList) {
      let route = 'properties';
      setPropertyJsx(
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
        />,
      );
      route = 'options';
    } else {
      setPropertyJsx(undefined);
    }
  }, [categorySubList, handleEvent]);
  return <>{propertyJsx}</>;
};

export default memo(SettingCatalogProperty);
