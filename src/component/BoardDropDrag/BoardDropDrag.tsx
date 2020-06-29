import React, { memo, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '../boardFunction/boardFunction';
import styles from './styles.module.scss';
import { BoardContext } from '../Board/BoardContext';
import { BoardDropContext } from '../BoardDrop/BoardDropContext';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';

interface IBoardDropDrag {
  item: any;
  index: number;
}

const BoardDropDrag: React.FC<IBoardDropDrag> = ({ item, index }) => {
  const { state, setState } = useContext(BoardContext);
  const { ind } = useContext(BoardDropContext);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
          )}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            {item.content}
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faGripVertical} />
            </div>

            <div
              className={`${styles.icon} ${styles.icon_red} pointer`}
              onClick={() => {
                const newState = [...state];
                newState[ind].splice(index, 1);
                setState(newState.filter((group) => group.length));
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(BoardDropDrag);
