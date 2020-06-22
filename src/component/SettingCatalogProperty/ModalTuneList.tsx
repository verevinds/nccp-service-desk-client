import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
interface IQuote {
  quote: any;
  index: any;
  handleDelete: (id: any) => void;
}
const Quote: React.FC<IQuote> = ({ quote, index, handleDelete }) => {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.item}>
          {quote.content}
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faGripVertical} />
          </div>

          <div
            className={`${styles.icon} ${styles.icon_red} pointer`}
            onClick={() => {
              handleDelete(quote.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

function ModalTuneList({ quotes, handleDelete }: any) {
  return quotes.map((quote: any, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} handleDelete={handleDelete} />
  ));
}

export default memo(ModalTuneList);
