import * as React from 'react';
import { IState, TGroup, TGroupProperty } from 'src/interface';
import { IModalWindow } from '../ModalWindow/interface';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { queryApi } from 'src/redux/actionCreators/queryApiAction';
import { groupUpdate } from 'src/redux/actionCreators/groupAction';

export interface IGroupModal extends IModalWindow {
  id?: number;
}

const GroupModal: React.FC<IGroupModal> = ({ id, show, onHide }) => {
  const {
    groups: { list },
  }: IState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [choosedGroup, setChoosedGroup] = React.useState('');
  const [validated, setValidated] = React.useState(false);
  const [textButton, setTextButton] = React.useState('Добавить');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      onHide && onHide();
      dispatch(
        queryApi({
          route: 'groups/property/',
          method: 'post',
          data: { groupId: choosedGroup, propertyId: id },
          actionUpdate: groupUpdate,
        }),
      );
    }

    setValidated(true);
  };
  React.useEffect(() => {
    let isGroup = false;
    list.forEach((group: TGroup) =>
      group.properties.forEach((property: TGroupProperty) => {
        if (property.propertyId === id) {
          isGroup = true;
          setChoosedGroup(String(property.groupId));
          setTextButton('Изменить');
        }
      }),
    );

    if (!isGroup) {
      setTextButton('Добавить');
      setChoosedGroup('');
    }
  }, [list, id]);

  return (
    <ModalWindow
      title={`Добавить Параметр №${id} в группу`}
      show={show}
      onHide={onHide}
      noValidate
      validated={validated}
      onSubmit={onSubmit}
      textOk={textButton}>
      <FormControl
        as='select'
        value={choosedGroup}
        onChange={(event: React.FormEvent<HTMLInputElement>) => {
          setChoosedGroup(event.currentTarget.value);
        }}
        required>
        <option value=''></option>
        {list.map((group: TGroup) => (
          <option value={group.id} key={group.id}>
            {group.name}
          </option>
        ))}
      </FormControl>
    </ModalWindow>
  );
};

export default React.memo(GroupModal);
