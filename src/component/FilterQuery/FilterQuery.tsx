import React, { memo, useState, useEffect, useMemo } from 'react';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { useDispatch } from 'react-redux';

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
        list.filter(
          (item: any) => ~item?.name.toLowerCase().indexOf(text.toLowerCase()),
        ),
      );
    }
  }, [list, text]);

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
