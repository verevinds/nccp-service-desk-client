import React, { memo, useEffect, useState, useCallback } from 'react';
import List from '../List/List';
import { THandleEvent } from '../SettingCatalog/SettingCatalog';
import { THandleBind } from '../ListItem/ListItem';
import { TCategory } from '../../interface';
import ModalTune from '../ModalTune/ModalTune';

export interface ISettingCatalogOption extends THandleEvent {
  categorySubList?: TCategory;
  handleBind: THandleBind;
}

const SettingCatalogOption: React.FC<ISettingCatalogOption> = ({
  categorySubList,
  handleEvent,
  handleBind,
  handleRules,
}) => {
  const [modalTune, setModalTune] = useState(false);
  const [id, setId] = useState(undefined);
  const [optionJsx, setOptionJsx] = useState<JSX.Element | undefined>();

  const handleTune = useCallback(({ id }) => {
    setId(id);
    setModalTune(true);
  }, []);

  useEffect(() => {
    let newOptionJsx;

    if (categorySubList) {
      let route = 'options';

      newOptionJsx = (
        <List
          title='Опции'
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
          handleBind={handleBind}
          handleTune={handleTune}
          handleRules={handleRules}
          xs={3}
        />
      );
    }

    setOptionJsx(newOptionJsx);
  }, [categorySubList, handleEvent, handleBind, handleTune, handleRules]);

  return (
    <>
      {!!modalTune ? <ModalTune show={modalTune} setShow={setModalTune} id={id} /> : undefined}

      {optionJsx}
    </>
  );
};

export default memo(SettingCatalogOption);
