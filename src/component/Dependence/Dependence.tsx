import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { Row, Col, Container, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import ButtonFontAwesome from '../ButtonFontAwesome/ButtonFontAwesome';
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import './Dependence.scss';
export interface IDependence {
  title: string;
  pickList: { id: number; [k: string]: any }[];
  handleAdd: (select: string) => () => void;
  handleDelete: (id: number) => () => void;
  listDependence: { id: number; idDependence: number; name: string }[];
}

const Dependence: React.FC<IDependence> = ({
  title,
  pickList,
  handleAdd,
  listDependence,
  handleDelete,
}) => {
  const [select, setSelect] = React.useState('');
  return (
    <Col>
      <Container>
        <h2>{title}</h2>
        <div className='dependence__select'>
          <FormControl
            as='select'
            value={select}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setSelect(event.currentTarget.value);
            }}>
            <option value='' disabled>
              Выберите сотрудника
            </option>
            {pickList.map((el: any) => {
              if (!~listDependence.findIndex((item) => item.idDependence === el.id))
                return (
                  <option value={el.id} key={el.id}>{`${el.name1} ${el.name2} ${el.name3}`}</option>
                );
            })}
          </FormControl>
          <ButtonFontAwesome
            faIcon={faPlus}
            onClick={() => {
              handleAdd(select)();
              setSelect('');
            }}
            tooltip='Добавить'
          />
        </div>
        <hr />
        <ListGroup>
          {listDependence.map((el) => (
            <ListGroupItem key={el.id}>
              <div className='dependence__item'>
                {el.name}{' '}
                <ButtonFontAwesome
                  faIcon={faTrash}
                  onClick={handleDelete(el.id)}
                  tooltip='Удалить'
                  variant='danger'
                />
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </Col>
  );
};

export default React.memo(Dependence);
