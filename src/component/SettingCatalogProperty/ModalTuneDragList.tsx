import React, { memo, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ModalTuneList from './ModalTuneList';
export interface IModalTuneDragList {
  state: any;
  setState: any;
}

const ModalTuneDragList: React.FC<IModalTuneDragList> = ({ state, setState }) => {
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(state.quotes, result.source.index, result.destination.index);

    setState({ quotes });
  }

  function handleDelete(id: any) {
    let newState = state?.quotes.filter((item: any) => item.id !== String(id));
    setState({ quotes: newState });
  }
  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ModalTuneList quotes={state.quotes} handleDelete={handleDelete} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

export default memo(ModalTuneDragList);
