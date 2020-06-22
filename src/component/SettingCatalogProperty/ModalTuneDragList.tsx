import React, { memo, useState, useMemo, Fragment, useLayoutEffect, useEffect, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalTuneList from './ModalTuneList';
import ModalTunePanel from './ModalTunePanel';
import ConstructorInput, { TConstructorInput, IConstructorInput } from '../ConstructorInput/ConstructorInput';
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
    // console.log(state?.quotes);
    let newState = state?.quotes.filter((item: any) => item.id !== String(id));
    // console.log(id);
    // console.log(newState);
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
