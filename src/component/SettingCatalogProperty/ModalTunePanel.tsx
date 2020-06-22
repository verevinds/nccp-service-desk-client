import React, { memo, useState, useMemo, SetStateAction } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from './styles.module.scss';
import ConstructorInput, { TConstructorInput, TTypeInput } from '../ConstructorInput/ConstructorInput';
import { uid } from 'react-uid';
export interface IModalTunePanel {
  setInput: SetStateAction<any>;
  stateInput: any;
}

const ModalTunePanel: React.FC<IModalTunePanel> = ({ stateInput, setInput }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [required, setRequired] = useState(false);

  const [type, setType] = useState<TTypeInput | string>('');
  const [subType, setSubType] = useState('');
  const jsxSubType = useMemo(() => {
    if (String(subType) !== 'switch' && String(subType) !== 'checkbox')
      return (
        <Form.Group controlId="exampleForm.ControlSelect0">
          <Form.Label>Тип формы</Form.Label>
          <Form.Control
            as="select"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setType(event.currentTarget.value);
            }}
          >
            <option value="text">Текст</option>
            <option value="password">Пароль</option>
            <option value="reset">Кнопка "Обнуления формы"</option>
            <option value="color">Палитра</option>
            <option value="date">Дата</option>
            <option value="datetime-local">Дата и время</option>
            <option value="email">Email</option>
            <option value="number">Числовая строка</option>
            <option value="range">Диапозон</option>
            <option value="search">Строка (Быстроя очистка)</option>
            <option value="tel">Телефон</option>
            <option value="time">Время</option>
            <option value="url">Ссылка</option>
            <option value="month">Месяц</option>
            <option value="week">Неделя</option>
          </Form.Control>
        </Form.Group>
      );
  }, [subType]);

  const input = useMemo(() => {
    let obj: TConstructorInput = {};
    obj.type = type;
    obj.title = title;
    obj.description = description;
    obj.placeholder = placeholder;
    obj.required = required;

    // title: 'string';
    // placeholder: 'string';
    // type: 'string';
    // required: 'string';
    // description: 'string';
    // parent: 'string';
    return obj;
  }, [type, title, description, placeholder, required]);

  return (
    <div>
      <h6>Пример:</h6>
      <ConstructorInput input={input} key={'fhfg1'} />
      <hr />
      <div className={styles.panel}>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setTitle(event.currentTarget.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect3">
          <Form.Label>Подпись</Form.Label>
          <Form.Control
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setDescription(event.currentTarget.value);
            }}
          />
          {type === 'switch' ? <Form.Text>Обязательно для заполнения</Form.Text> : undefined}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect4">
          <Form.Label>Текст заполнения</Form.Label>
          <Form.Control
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setPlaceholder(event.currentTarget.value);
            }}
          />
          {type === 'switch' ? <Form.Text>Обязательно для заполнения</Form.Text> : undefined}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect5">
          <Form.Label>Вид формы</Form.Label>
          <Form.Control
            as="select"
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              let type = event.currentTarget.value;
              type && setType(type);
              setSubType(type);
            }}
          >
            <option value="text">Строка</option>
            <option value="checkbox">Множественный выбор</option>
            <option value="switch">Переключатель</option>
          </Form.Control>
        </Form.Group>
        {jsxSubType}
      </div>
      <Form.Group controlId="exampleForm.ControlSelect6">
        <Form.Check
          className={styles.formControl}
          type="switch"
          label="Обязательное поле"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            //@ts-ignore
            setRequired(event.currentTarget.checked);
          }}
        />
      </Form.Group>
      <Button
        onClick={() => {
          setInput({ ...stateInput, [`${uid(input)}`]: input });
        }}
      >
        Добавить
      </Button>
    </div>
  );
};

export default memo(ModalTunePanel);
