import React, { memo, Fragment, useState, useMemo, useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { ConstructorInputChangeContext } from '../ConstructorInputChange/ConstructorInputChangeContext';
export interface IConstructorInputChangeText {}

const ConstructorInputChangeText: React.FC<IConstructorInputChangeText> = () => {
  const {
    input: { description },
    handleText,
  } = useContext(ConstructorInputChangeContext);
  const [text, setText] = useState(false);
  const [textText, setTextText] = useState(description || '');
  const textPlaceholder = 'Нажмите дважды, чтобы добавить подпись...';
  const saveText = useMemo(() => {
    return description;
  }, [description]);

  return (
    <Fragment>
      {text ? (
        <InputGroup className={`${styles.formCustom}`}>
          <Form.Control
            placeholder={'Введите текст подписи, либо оставьте пустым, чтобы удалить.'}
            value={textText}
            onChange={(event: React.FormEvent<HTMLInputElement>) => setTextText(event.currentTarget.value)}
          />
          <ButtonFontAwesome
            faIcon={faCheck}
            variant={'success'}
            onClick={() => {
              setText(false);
              handleText && handleText(textText);
            }}
          />
          <ButtonFontAwesome
            faIcon={faTimes}
            variant={'danger'}
            onClick={() => {
              setText(false);
              handleText && handleText(saveText ? saveText : '');
            }}
          />
        </InputGroup>
      ) : (
        <Form.Text
          style={description ? undefined : { color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          onDoubleClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            setTextText(description ? description : '');

            setText(true);
          }}
        >
          {description ? description : textPlaceholder}
        </Form.Text>
      )}
    </Fragment>
  );
};

export default memo(ConstructorInputChangeText);
