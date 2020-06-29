import React, { memo, useContext, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { IncidentWindowContext } from '../IncidentWindow/IncidentWindowContext';
import ConstructorInput from '../ConstructorInput/ConstructorInput';
import { TPropertyParam } from '../../interface';

export interface IIncidentHandleVise {
  show: boolean;
  onHide: () => void;
}

const IncidentHandleVise: React.FC<IIncidentHandleVise> = ({ show, onHide }) => {
  const [validated, setValidated] = useState(false);
  const { onClick } = useContext(IncidentWindowContext);
  let input: TPropertyParam = {
    title: '',
    description: '',
    parent: '',
    placeholder: '',
    required: true,
    select: 'users',
    type: 'list',
    value: '',
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
    setValidated(true);
  };
  return (
    <ModalWindow
      show={show}
      onHide={onHide}
      title={'Отправить на согласование'}
      textOk={'Отправить'}
      onSubmit={onSubmit}
      validated={validated}
    >
      <ConstructorInput input={input} id={'1'} />
    </ModalWindow>
  );
};

export default memo(IncidentHandleVise);
