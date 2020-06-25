import React, { memo, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ModalTuneDragList from './ModalTuneDragList';
export interface IModalTuneDrag {
  state: any;
  setState: any;
  handleDelete: (id: any) => void;
}

const ModalTuneDrag: React.FC<IModalTuneDrag> = ({ state, setState, handleDelete }) => {
  function reorder(list: any, startIndex: any, endIndex: any) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

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

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ModalTuneDragList quotes={state.quotes} handleDelete={handleDelete} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Fragment>
  );
};

export default memo(ModalTuneDrag);
