import React, { memo, Fragment, useState, useMemo } from 'react';
import { TConstructorInput } from '../ConstructorInput/ConstructorInput';
import { Form, InputGroup } from 'react-bootstrap';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

export interface IConstructorInputChange {
  handleLabel?: (agr: string) => void;
  handleControl?: (agr: string) => void;
  handleText?: (agr: string) => void;
  input: TConstructorInput;
}

const ConstructorInputChange: React.FC<IConstructorInputChange> = ({
  handleControl,
  handleLabel,
  handleText,
  input,
}) => {
  const [label, setLabel] = useState(false);
  const [control, setControl] = useState(false);
  const [text, setText] = useState(false);
  const [labelText, setLabelText] = useState(input.title || '');
  const [controlText, setControlText] = useState(input.placeholder || '');
  const [textText, setTextText] = useState(input.description || '');

  const labelPlaceholder = 'Нажмите дважды, чтобы добавить заголовок...';
  const textPlaceholder = 'Нажмите дважды, чтобы добавить подпись...';

  const saveLabel = useMemo(() => {
    return input.title;
  }, [input.title]);
  const saveControl = useMemo(() => {
    return input.placeholder;
  }, [input.placeholder]);
  const saveText = useMemo(() => {
    return input.description;
  }, [input.description]);

  const controlPlaceholder = useMemo(() => {
    if (input.placeholder) {
      return input.placeholder;
    } else {
      if (control) return 'Введите текст заполнителя, либо оставьте пустым, чтобы удалить.';
      else return `Нажмите дважды, чтобы добавить текст заполнителя...`;
    }
  }, [input.placeholder, control]);

  return (
    <Fragment>
      {label ? (
        <InputGroup className={`${styles.formCustom}`}>
          <Form.Control
            placeholder={'Введите текст заголовока, либо оставьте пустым, чтобы удалить.'}
            defaultValue={labelText}
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
          style={input.title ? undefined : { color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          onDoubleClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => setLabel(true)}
        >
          {input.title ? input.title : labelPlaceholder}
        </Form.Label>
      )}

      {input.type !== 'title' ? (
        <InputGroup>
          {(input.type === 'checkbox' || input.type === 'switch') && !control ? (
            <>
              <Form.Check type={input.type} label="" />

              <Form.Label
                className="pointer"
                style={input.placeholder ? undefined : { color: 'rgba(255,255,255,0.5)' }}
                onDoubleClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => setControl(true)}
              >
                {input.placeholder ? input.placeholder : `Нажмите дважды, чтобы добавить текст...`}
              </Form.Label>
            </>
          ) : (
            <>
              {input.type === 'checkbox' || input.type === 'switch' ? (
                <Form.Check type={input.type} label="" />
              ) : undefined}
              <Form.Control
                className={styles.input}
                style={control ? { color: '#000', cursor: 'text' } : { cursor: 'pointer' }}
                type={control ? 'text' : input.type}
                value={!control ? '' : !!controlText ? controlText : saveControl}
                placeholder={controlPlaceholder}
                onDoubleClick={() => setControl(true)}
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
      ) : undefined}

      {text ? (
        <InputGroup className={`${styles.formCustom}`}>
          <Form.Control
            placeholder={'Введите текст подписи, либо оставьте пустым, чтобы удалить.'}
            defaultValue={textText}
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
          style={input.description ? undefined : { color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          onDoubleClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => setText(true)}
        >
          {input.description ? input.description : textPlaceholder}
        </Form.Text>
      )}
    </Fragment>
  );
};

export default memo(ConstructorInputChange);
