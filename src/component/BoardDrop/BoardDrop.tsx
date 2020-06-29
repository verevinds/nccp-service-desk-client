import React, { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { getListStyle } from '../boardFunction/boardFunction';
import { useContext } from 'react';
import BoardDropDrag from '../BoardDropDrag/BoardDropDrag';
import { BoardDropContext } from './BoardDropContext';

interface IBoardDrop {}

const BoardDrop: React.FC<IBoardDrop> = () => {
  const { el, ind } = useContext(BoardDropContext);
  return (
    <Droppable key={ind} droppableId={`${ind}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          {el.map((item: any, index: number) => (
            <BoardDropDrag item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default memo(BoardDrop);
