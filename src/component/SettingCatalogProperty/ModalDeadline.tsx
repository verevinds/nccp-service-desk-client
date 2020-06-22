import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import Axios from 'axios';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { categoryUpdate } from '../../redux/actionCreators/catalogAction';
import ModalWindow from '../ModalWindow/ModalWindow';
import { TProperty, TCategory } from '../../interface';

export interface IModalDeadline {
  route: string;
  property: any;
  setShow: (agr: boolean) => void;
  show: boolean;
}

const ModalDeadline: React.FC<IModalDeadline> = ({ route, property, setShow, show }) => {
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState(1);
  const onClick = useCallback(() => {
    dispatch(
      queryApi({
        route,
        method: 'put',
        data: { deadline },
        actionUpdate: categoryUpdate,
        id: property?.id,
      }),
    );
    setShow(false);
  }, [deadline, property, route, dispatch, setShow]);

  useEffect(() => {
    property && setDeadline(property.deadline);
  }, [property]);

  return (
    <>
      <ModalWindow
        show={show}
        title="Срок выполнения"
        onHide={() => setShow(false)}
        onOk={onClick}
        textOk={'Сохранить'}
        size={'sm'}
      >
        <Form.Group controlId="formBasicRange">
          <Form.Label>Параметр: {property?.name}</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={deadline}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setDeadline(Number(event.currentTarget.value));
            }}
          />
          <br />
          <Form.Control
            type="range"
            min={1}
            value={deadline}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setDeadline(Number(event.currentTarget.value));
            }}
          />
        </Form.Group>
      </ModalWindow>
    </>
  );
};

export default memo(ModalDeadline);
