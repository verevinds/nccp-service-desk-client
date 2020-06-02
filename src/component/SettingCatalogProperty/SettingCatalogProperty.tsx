import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';

export interface ISettingCatalogProperty {
  categorySubList: TCategorySubList;
  handleEvent: (
    arg0: THandleEventParams,
  ) => ((val: { id?: number; value?: string }) => void) | undefined;
}

type THandleEventParams = {
  route: string;
  list?: [];
  fact?: string;
  setCurrent?: () => void;
};

type TCategorySubList = {
  id: number;
  name: string;
  departmentId: number;
  level: number;
  isArchive: boolean;
  deadline: number;
  createdAt: string;
  updatedAt: string;
  properties: [];
};

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
