import React, { memo, useState } from 'react';
import { IList, TList } from './interface';
import ListItem from './ListItem';
import { ListContext } from './context';
import styles from './styles.module.css';

//? Bootstrap
import { ListGroup, Col, Button } from 'react-bootstrap';
import FilterQuery from '../FilterQuery/FilterQuery';

const List: React.FC<IList> = ({
  title,
  list,
  onClick,
  onDelete,
  onFavorites,
  xs,
}) => {
  const [activeId, setActiveId] = useState<number | undefined>(undefined);
  const [localList, setLocalList] = useState([]);

  const [limit, setLimit] = useState(50);
  return (
    <Col xs={xs || 3}>
      <h3>{title}</h3>
      <FilterQuery list={list} setList={setLocalList} />
      <ListContext.Provider value={{ activeId, setActiveId }}>
        <ListGroup variant="flush" className={`${styles.listGroup} `}>
          {!!localList.length ? (
            <>
              {localList.map((item: TList, index: number) => {
                if (index < limit) {
                  return (
                    <ListItem
                      item={item}
                      onClick={onClick}
                      onDelete={onDelete}
                      onFavorites={onFavorites}
                      activeId={activeId}
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
