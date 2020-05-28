import React, { memo, useState, useEffect } from 'react';

//? Bootstrap
import { InputGroup, FormControl } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IFilterQuery {
  setList: (list: never[] | []) => void;
  list: never[] | [];
}
const FilterQuery: React.FC<IFilterQuery> = ({ setList, list }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (list.length && setList) {
      setList(
        list
          .filter(
            (item: any) =>
              ~item?.name.toLowerCase().indexOf(text.toLowerCase()),
          )
          .sort((a: any, b: any) => (b.id < a.id ? 1 : -1))
          .sort((a: any, b: any) => (b.name < a.name ? 1 : -1)),
      );
    }
  }, [list, text, setList]);

  return (
    <InputGroup className="mb-1">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Поиск..."
        aria-describedby="basic-addon1"
        value={text}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setText(event.currentTarget.value);
        }}
      />
    </InputGroup>
  );
};

export default memo(FilterQuery);
