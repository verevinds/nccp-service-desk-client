import React, { memo, useState } from 'react';
import ListItem from './ListItem';
import { ListContext } from './context';
import styles from './styles.module.css';

//? Bootstrap
import { ListGroup, Col, Button } from 'react-bootstrap';
import FilterQuery from '../FilterQuery/FilterQuery';
import InputFormSubmite from '../InputFormSubmite/InputFormSubmite';

export type THandle = {
  onSubmit?: (val: { value: string }) => void;
  onDelete?: (val: { id: number }) => void;
  activeId?: number;
  onClick?: (id: number) => void;
  onFavorites?: (val: { id: number }) => void;
  onArchive?: (val: { id: number }) => void;
};

export type TList = {
  id: number;
  name: string;
  createdAt: string;
  noChange?: boolean | undefined;
  level?: number;
  isArchive?: boolean;
};

export interface IList extends THandle {
  title: string;
  xs?: number;
  list: [] | never[];
}

const List: React.FC<IList> = ({
  title,
  list,
  onClick,
  onDelete,
  onFavorites,
  onSubmit,
  onArchive,
  xs,
}) => {
  const [activeId, setActiveId] = useState<number | undefined>(undefined);
  const [localList, setLocalList] = useState([]);

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
                      key={item.id}
                    />
                  );
                } else return undefined;
              })}
              <hr />
              {localList.map((item: TList, index: number) => {
                if (index < limit && item.isArchive) {
                  return (
                    <ListItem
                      item={item}
                      onDelete={onDelete}
                      onArchive={onArchive}
                      key={item.id}
                    />
                  );
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
