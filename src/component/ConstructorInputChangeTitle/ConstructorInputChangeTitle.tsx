import React, { memo, Fragment, useState, useMemo, useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { ConstructorInputChangeContext } from '../ConstructorInputChange/ConstructorInputChangeContext';
export interface IConstructorInputChangeTitle {}

const ConstructorInputChangeTitle = () => {
  const {
    input: { title },
    handleLabel,
  } = useContext(ConstructorInputChangeContext);
  const [label, setLabel] = useState(false);
  const [labelText, setLabelText] = useState(title || '');
  const labelPlaceholder = 'Нажмите дважды, чтобы добавить заголовок...';

  const saveLabel = useMemo(() => {
    return title;
  }, [title]);
  return (
    <Fragment>
      {label ? (
        <InputGroup className={`${styles.formCustom}`}>
          <Form.Control
            placeholder={'Введите текст заголовока, либо оставьте пустым, чтобы удалить.'}
            value={labelText}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setLabelText(event.currentTarget.value)}
          />
          <ButtonFontAwesome
            faIcon={faCheck}
            variant={'success'}
            onClick={() => {
              setLabel(false);
              handleLabel && handleLabel(labelText);
            }}
          />
          <ButtonFontAwesome
            faIcon={faTimes}
            variant={'danger'}
            onClick={() => {
              setLabel(false);
              handleLabel && handleLabel(saveLabel ? saveLabel : '');
            }}
          />
        </InputGroup>
      ) : (
        <Form.Label
          style={title ? undefined : { color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          onDoubleClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            setLabelText(title ? title : '');
            setLabel(true);
          }}
        >
          {title ? title : labelPlaceholder}
        </Form.Label>
      )}
    </Fragment>
  );
};

export default memo(ConstructorInputChangeTitle);
