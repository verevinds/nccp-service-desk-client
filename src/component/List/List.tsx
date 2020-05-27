import React, { memo, useState } from 'react';
import { IList, TList } from './interface';
import ListItem from './ListItem';
import { ListContext } from './context';

//? Bootstrap
import { ListGroup } from 'react-bootstrap';

const List: React.FC<IList> = ({ list, onClick, onDelete, onFavorites }) => {
  const [activeId, setActiveId] = useState<number | undefined>(undefined);
  return (
    <ListContext.Provider value={{ activeId, setActiveId }}>
      <ListGroup variant="flush">
        {!!list.length ? (
          list
            .sort((a: any, b: any) => {
              if (b.id < a.id || b.name < a.name) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((item: TList) => {
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
            })
        ) : (
          <small className="text-muted text-center">Данные отсутствуют</small>
        )}
      </ListGroup>
    </ListContext.Provider>
  );
};
export default memo(List);
