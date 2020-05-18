import React, { memo, useState, useLayoutEffect } from 'react';
import { IList, TList } from './interface';
import ListItem from './ListItem';

//? Bootstrap
import { Col, Form, InputGroup, FormControl } from 'react-bootstrap';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

const List: React.FC<IList> = ({
  title,
  onSubmit,
  onDelete,
  onClick,
  activeId,
  list,
  onFavorites,
  xs,
}) => {
  const [input, setInput] = useState('');

  const [filterList, setFilterList] = useState<TList[]>(list);
  const [filter, setFilter] = useState('');
  useLayoutEffect(() => {
    setFilterList(
      list.filter(
        (item) => ~item.name.toLowerCase().indexOf(filter.toLowerCase()),
      ),
    );
  }, [list, filter]);
  if (Array.isArray(list)) {
    return (
      <Col xs={xs}>
        <h2>{title}</h2>
        <InputGroup className="mb-1">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Поиск..."
            aria-label="Ведущий специалист"
            aria-describedby="basic-addon1"
            onChange={(event: any) => {
              setFilter(event.target.value);
            }}
          />
        </InputGroup>
        {!!onSubmit ? (
          <Form
            onSubmit={(event: any) => {
              if (!!onSubmit) {
                //@ts-ignore
                onSubmit(event, input);
                setInput('');
              }
            }}
          >
            <Form.Group>
              <InputGroup className="mb-1">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faFolderPlus} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder='Введите название и нажмите "Enter"'
                  value={input}
                  onChange={(event: any) => {
                    setInput(event.target.value);
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        ) : null}

        <ListItem
          filterList={filterList}
          activeId={activeId}
          onClick={onClick}
          onDelete={onDelete}
          onFavorites={onFavorites}
        />
      </Col>
    );
  } else {
    return null;
  }
};
export default memo(List);
