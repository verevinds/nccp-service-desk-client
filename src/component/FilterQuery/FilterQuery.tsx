import React, { memo, useState, useEffect } from 'react';

//? Bootstrap
import { InputGroup, FormControl } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { nameUser } from '../../js/supportingFunction';

interface IFilterQuery {
  setList?: (list: never[] | any[]) => void;
  list?: any[];
  dropdowns?: {
    element: JSX.Element;
  };
  handleText?: { text: string; setText: (text: string) => void };
  options?: { placeholder: string };
}
const FilterQuery: React.FC<IFilterQuery> = ({ setList, list, dropdowns, handleText, options }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!!list && !!list.length && setList) {
      const filterList = list
        .filter((item: any) =>
          item?.name
            ? ~item?.name.toLowerCase().indexOf(text.toLowerCase())
            : ~`${nameUser(item)?.fullName()}`.toLowerCase().indexOf(text.toLowerCase()),
        )
        .sort((a: any, b: any) => (b.id < a.id ? 1 : -1))
        .sort((a: any, b: any) => (b.name && a.name ? (b.name < a.name ? 1 : -1) : b.name1 < a.name1 ? 1 : -1));

      setList(filterList);
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
        placeholder={options && options.placeholder ? options.placeholder : 'Поиск...'}
        aria-describedby="basic-addon1"
        value={handleText ? handleText.text : text}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          handleText ? handleText.setText(event.currentTarget.value) : setText(event.currentTarget.value);
        }}
      />
      {!dropdowns ? undefined : (
        <InputGroup.Prepend>
          <InputGroup.Text>{dropdowns.element}</InputGroup.Text>
        </InputGroup.Prepend>
      )}
    </InputGroup>
  );
};

export default memo(FilterQuery);
