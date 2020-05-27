import React, { memo, useState, useEffect } from 'react';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { useDispatch } from 'react-redux';

//? Bootstrap
import { InputGroup, FormControl } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface IFilterQuery {
  actionSuccessed: () => void;
  route: string;
  noFetchVoid?: boolean;
}
const FilterQuery: React.FC<IFilterQuery> = ({
  actionSuccessed,
  route,
  noFetchVoid,
}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const fetchQuery = (filter: string) => {
      dispatch(
        queryApi({
          route,
          actionSuccessed,
          params: { filter },
        }),
      );
    };

    if (noFetchVoid)
      if (filter)
        fetchQuery(
          filter
            .split(' ')
            .map((item) =>
              item ? item[0].toUpperCase() + item.slice(1).toLowerCase() : ``,
            )
            .join(' ')
            .trim(),
        );
  }, [filter, noFetchVoid, actionSuccessed, dispatch, route]);

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
        value={filter}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setFilter(event.currentTarget.value);
        }}
      />
    </InputGroup>
  );
};

export default memo(FilterQuery);
