import React, { memo, useState, useMemo, useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';
import { ConstructorInputChangeContext } from '../ConstructorInputChange/ConstructorInputChangeContext';

export interface IConstructorInputChangeInput {}

const ConstructorInputChangeInput: React.FC<IConstructorInputChangeInput> = () => {
  const {
    input: { placeholder, type },
    handleControl,
  } = useContext(ConstructorInputChangeContext);
  const [control, setControl] = useState(false);

  const [controlText, setControlText] = useState(placeholder || '');

  const saveControl = useMemo(() => {
    return placeholder;
  }, [placeholder]);

  const controlPlaceholder = useMemo(() => {
    if (placeholder && !control) {
      return placeholder;
    }

    if (control) return 'Введите текст заполнителя, либо оставьте пустым, чтобы удалить.';
    else return `Нажмите дважды, чтобы добавить текст заполнителя...`;
  }, [placeholder, control]);

  return (
    <InputGroup>
      {(type === 'checkbox' || type === 'switch') && !control ? (
        <>
          <Form.Check type={type} label="" />

          <Form.Label
            className="pointer"
            style={placeholder ? undefined : { color: 'rgba(255,255,255,0.5)' }}
            onDoubleClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
              setControlText(placeholder ? placeholder : '');

              setControl(true);
            }}
          >
            {placeholder ? placeholder : `Нажмите дважды, чтобы добавить текст...`}
          </Form.Label>
        </>
      ) : (
        <>
          {type === 'checkbox' || type === 'switch' ? <Form.Check type={type} label="" /> : undefined}
          <Form.Control
            className={styles.input}
            style={control ? { color: '#000', cursor: 'text' } : { cursor: 'pointer' }}
            type={control ? 'text' : type}
            value={!control ? '' : controlText}
            placeholder={controlPlaceholder}
            onDoubleClick={() => {
              saveControl && setControlText(saveControl);
              setControl(true);
            }}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              control && setControlText(event.currentTarget.value)
            }
          />
          {controlText || control ? (
            <>
              <ButtonFontAwesome
                faIcon={faCheck}
                variant={'success'}
                onClick={() => {
                  handleControl && handleControl(controlText);
                  setControlText('');
                  setControl(false);
                }}
              />
              <ButtonFontAwesome
                faIcon={faTimes}
                variant={'danger'}
                onClick={() => {
                  setControlText('');
                  handleControl && handleControl(saveControl ? saveControl : '');
                  setControl(false);
                }}
              />
            </>
          ) : undefined}
        </>
      )}
    </InputGroup>
  );
};

export default memo(ConstructorInputChangeInput);
