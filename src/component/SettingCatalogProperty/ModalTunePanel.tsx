import React, { memo, useState, useMemo, SetStateAction } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './styles.module.scss';
import ConstructorInputChange from '../ConstructorInputChange/ConstructorInputChange';
import { TTypeInput, TPropertyParam } from '../../interface';
export interface IModalTunePanel {
  setInput: SetStateAction<any>;
  stateInput: (TPropertyParam | never)[];
}

const ModalTunePanel: React.FC<IModalTunePanel> = ({ stateInput, setInput }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [required, setRequired] = useState(false);
  const [parent, setParent] = useState('');
  const [type, setType] = useState<TTypeInput | string>('');
  const [subType, setSubType] = useState('');
  const [listType, setListType] = useState('');

  const jsxSubType = useMemo(() => {
    if (
      String(subType) !== 'switch' &&
      String(subType) !== 'checkbox' &&
      String(subType) !== 'title' &&
      String(type) !== 'list'
    )
      return (
        <>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" as="h5">
              Тип
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            className={styles.formControl}
            value={type}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setType(event.currentTarget.value);
            }}
          >
            <option value="text">Текст</option>
            <option value="password">Пароль</option>
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
        </>
      );
  }, [subType, type]);

  const jsxListType = useMemo(() => {
    if (type === 'list') {
      let initialList = 'departments';
      setListType(initialList);

      return (
        <>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" as="h5">
              Тип
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              let listType = event.currentTarget.value;
              setListType(listType);
            }}
            value={listType}
          >
            <option value={initialList}>Отделы</option>
          </Form.Control>
        </>
      );
    }
  }, [type, listType]);
  const input = useMemo(() => {
    let obj: TPropertyParam = {
      title,
      placeholder,
      type,
      required,
      description,
      parent,
      select: listType,
      value: '',
    };

    return obj;
  }, [type, title, description, placeholder, required, listType, parent]);

  return (
    <div className={styles.tunePanel}>
      <h5>Добавление поля ввода</h5>
      <div className={styles.tunePanel_Panel}>
        <InputGroup className={styles.inputGroup}>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" as="h5">
              Вид
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              let type = event.currentTarget.value;
              type && setType(type);
              setSubType(type);
              if (type !== 'list') setListType('');
            }}
            value={type}
          >
            <option value="text">Текстовое поле</option>
            <option value="checkbox">Множественный выбор</option>
            <option value="list">Выпадающий список</option>
            <option value="switch">Переключатель</option>
            <option value="title">Заголовок</option>
          </Form.Control>
          {jsxSubType}
          {jsxListType}
        </InputGroup>

        <InputGroup className={styles.inputGroup}>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1" as="h5">
              активно, если поле
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            className={styles.formControl}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              let value = event.currentTarget.value;
              setParent(value);
            }}
          >
            <option selected value=""></option>
            {stateInput?.map((item: TPropertyParam, index) => {
              let { type, description, title, placeholder } = item;
              if (type !== 'title')
                return (
                  <option value={index}>{`№ ${index + 1} ${title} ${description} ${placeholder} ${
                    !title && !description && !placeholder && ' без обозначений'
                  }`}</option>
                );
              else return <></>;
            })}
          </Form.Control>
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon1" as="h5">
              пустое
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </div>

      <Form.Group controlId="exampleForm.ControlSelect10" className={styles.tunePanel_Body}>
        <ConstructorInputChange
          input={input}
          handleText={setDescription}
          handleControl={setPlaceholder}
          handleLabel={setTitle}
        />
      </Form.Group>
      <div className={styles.tunePanel__buttons}>
        <Form.Group controlId="exampleForm.ControlSelect6" className={`${styles.formCheck} pointer`}>
          {String(subType) !== 'title' ? (
            <Form.Check
              type="switch"
              className={`pointer`}
              label="Обязательное поле"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                //@ts-ignore
                setRequired(event.currentTarget.checked);
              }}
            />
          ) : undefined}
        </Form.Group>

        <Button
          onClick={() => {
            if (stateInput) {
              let newInput = [...stateInput];

              newInput.push(input);

              setInput(newInput);
            } else {
              let newInput = [];

              newInput.push(input);

              setInput(newInput);
            }
            setTitle('');
            setDescription('');
            setPlaceholder('');
            setRequired(false);
            setType('');
            setSubType('');
          }}
          variant="outline-light"
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default memo(ModalTunePanel);
