import React, { memo, useState, Dispatch, SetStateAction } from 'react';
import ListItem, { THandleBind } from './ListItem';
import { ListContext } from './context';
import { TFn } from '../SettingCatalog/SettingCatalog';
import FilterQuery from '../FilterQuery/FilterQuery';
import InputFormSubmite from '../InputFormSubmite/InputFormSubmite';
import styles from './styles.module.css';

//? Bootstrap
import { ListGroup, Col, Button } from 'react-bootstrap';
import { TItemTag } from './ListItemTag';

export type THandle = ({ id, value }: TFn) => void;
export interface IHandle {
  onSubmit?: THandle;
  onDelete?: THandle;
  onClick?: Dispatch<SetStateAction<number | undefined>>;
  onFavorites?: THandle;
  onArchive?: THandle;
  handleDedline?: THandle;
  handleTune?: ({ id }: { id: number }) => void;
  handleResponsible?: (agr0: { id: number }) => void;
  handleRules?: (agr0: { id: number }) => void;
}
export type TList = {
  id: number;
  name: string;
  createdAt: string;
  noChange?: boolean | undefined;
  level?: number;
  isArchive?: boolean;
  bind: TItemTag[];
  name1?: string;
  name2?: string;
  name3?: string;
  number?: number;
};

export interface IList extends IHandle {
  title?: string;
  xs?: number;
  list: any[];
  handleBind?: THandleBind;
}

const List: React.FC<IList> = ({
  title,
  list,
  onClick,
  onDelete,
  onFavorites,
  onSubmit,
  onArchive,
  handleBind,
  handleDedline,
  handleTune,
  handleResponsible,
  handleRules,
  xs,
}) => {
  const [activeId, setActiveId] = useState<number | undefined>(undefined);
  const [localList, setLocalList] = useState<any[]>([]);
  const [limit, setLimit] = useState(50);
  return (
    <Col xs={xs || 3}>
      <h3>{title}</h3>
      <FilterQuery list={list} setList={setLocalList} />
      {onSubmit ? <InputFormSubmite onSubmit={onSubmit} /> : undefined}
      <ListContext.Provider value={{ activeId, setActiveId }}>
        <ListGroup variant="flush" className={`${styles.listGroup} `}>
          {!!localList ? (
            <>
              {localList.map((item: TList, index: number) => {
                if (index < limit && !item.isArchive) {
                  return (
                    <ListItem
                      item={item}
                      onClick={onClick}
                      onDelete={onDelete}
                      onFavorites={onFavorites}
                      onArchive={onArchive}
                      activeId={activeId}
                      handleBind={handleBind}
                      handleDedline={handleDedline}
                      handleTune={handleTune}
                      handleResponsible={handleResponsible}
                      handleRules={handleRules}
                      key={item.id}
                    />
                  );
                } else return undefined;
              })}
              <hr />
              {~localList.findIndex((item: TList, index: number) => item.isArchive) ? <h6>В архиве</h6> : undefined}
              {localList.map((item: TList, index: number) => {
                if (index < limit && item.isArchive) {
                  return <ListItem item={item} onDelete={onDelete} onArchive={onArchive} key={item.id} />;
                } else return undefined;
              })}
              {localList.length > 50 && localList.length > limit ? (
                <Button
                  variant={'light'}
                  onClick={() => {
                    setLimit(limit + 50);
                  }}
                  className={'mt-1'}
                >
                  Показать ещё
                </Button>
              ) : undefined}
            </>
          ) : (
            <small className="text-muted text-center">Данные отсутствуют</small>
          )}
        </ListGroup>
      </ListContext.Provider>
    </Col>
  );
};
export default memo(List);
