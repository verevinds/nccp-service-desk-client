import React, { memo, useEffect, useState } from 'react';
import List from '../List/List';
import {
  THandleEvent,
  TCategorySubList,
} from '../SettingCatalog/SettingCatalog';

export interface ISettingCatalogOption extends THandleEvent {
  categorySubList?: TCategorySubList;
}

const SettingCatalogOption: React.FC<ISettingCatalogOption> = ({
  categorySubList,
  handleEvent,
}) => {
  const [optionJsx, setOptionJsx] = useState<JSX.Element | undefined>();

  useEffect(() => {
    let newOptionJsx;

    if (categorySubList) {
      let route = 'options';

      newOptionJsx = (
        <List
          title="Опции"
          list={categorySubList.options}
          onSubmit={handleEvent({ route })}
          onDelete={handleEvent({ route, fact: 'delete' })}
          onFavorites={handleEvent({
            route,
            list: categorySubList.options,
            fact: 'favorites',
          })}
          onArchive={handleEvent({
            route,
            list: categorySubList.options,
            fact: 'archive',
          })}
          xs={3}
        />
      );
    }

    setOptionJsx(newOptionJsx);
  }, [categorySubList, handleEvent]);

  return <>{optionJsx}</>;
};

export default memo(SettingCatalogOption);
