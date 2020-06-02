import React, { memo, useEffect, useState, useCallback, Fragment } from 'react';
import List from '../List/List';
import { useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import { Row } from 'react-bootstrap';
import { THandleEvent } from '../SettingCatalog/SettingCatalog';

export interface ISettingCatalogOption extends THandleEvent {
  categorySubList: TCategorySubList;
}

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
  options: [];
};

const SettingCatalogOption: React.FC<ISettingCatalogOption> = ({
  categorySubList,
  handleEvent,
}) => {
  const [optionJsx, setOptionJsx] = useState<JSX.Element | undefined>();
  useEffect(() => {
    if (categorySubList) {
      let route = 'options';
      setOptionJsx(
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
        />,
      );
    } else {
      setOptionJsx(undefined);
    }
  }, [categorySubList, handleEvent]);
  return <>{optionJsx}</>;
};

export default memo(SettingCatalogOption);
