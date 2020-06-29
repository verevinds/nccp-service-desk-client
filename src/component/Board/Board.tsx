import React, { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { reorder, move } from '../boardFunction/boardFunction';
import { useContext } from 'react';
import { BoardContext } from './BoardContext';
import BoardDrop from '../BoardDrop/BoardDrop';
import { BoardDropContext } from '../BoardDrop/BoardDropContext';

const Board = () => {
  const { state, setState } = useContext(BoardContext);

  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result: any = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.map((el: any, ind: number) => (
        <BoardDropContext.Provider value={{ el, ind }}>
          <BoardDrop />
        </BoardDropContext.Provider>
      ))}
    </DragDropContext>
  );
};

export default memo(Board);
