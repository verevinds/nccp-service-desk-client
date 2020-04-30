import React, { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CreateIncidentModalSelect from '../CreateIncidentModalSelect/CreateIncidentModalSelect';

/**Bootstrap components */
import { Modal, Button, Form } from 'react-bootstrap';
import { incidentFetching } from '../../redux/actionCreators/incidentAction';

const CreateIncidentModel = ({ handleClose, showModal }) => {
  const {
    auth: { user },
    catalog: { list },
  } = useSelector((state) => state);

  const dateNow = new Date();
  const [incident, setIncident] = useState({
    startWork: `${dateNow.getFullYear()}-${dateNow.getUTCMonth()}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
    dateCreate: `${dateNow.getFullYear()}-${dateNow.getUTCMonth()}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
    currentResponsible: null,
    text: '',
    level: 0,
    status: 0,
    departmentId: user.departmentId,
    positionId: user.positionId,
    name: `${user.name1} ${user.name2} ${user.name3}`,
    email: user.email,
    number: user.number,
    phone1: user.phone1,
    phone2: user.phone2,
    categoryId: list[0] ? list[0].id : null,
    propertyId: list[0].properties[0] ? list[0].properties[0].id : null,
    optionId: list[0].options[0] ? list[0].options[0].id : null,
  });

  //? Инициализируем состояние номера текущей категории
  const [currentIdCategory, setCurrentIdCategory] = useState(
    incident.categoryId,
  );
  //? Инициализируем состояние номера текущего параметра
  const [currentIdProperty, setCurrentIdProperty] = useState(
    incident.propertyId,
  );
  //? Инициализируем состояние номера текущей опции
  const [currentIdOption, setCurrentIdOption] = useState(incident.optionId);

  //? Инициализируем состояние текущей категории
  const [currentCategory, setCurrentCategory] = useState(
    list.filter((item) => item.id === currentIdCategory),
  );

  //? Устанавливаем эффект на каждое изменение состояния номера текущей категории
  useEffect(() => {
    let categoryId = Number(currentIdCategory);
    let propertyId = Number(currentIdProperty);
    let optionId = Number(currentIdOption);

    const newCurrentCategory = list.filter(
      (item) => item.id === currentIdCategory,
    );

    if (categoryId != incident.categoryId) {
      if (!!newCurrentCategory[0].properties[0]) {
        propertyId = newCurrentCategory[0].properties[0].id;
      }
      if (!!newCurrentCategory[0].options[0]) {
        optionId = newCurrentCategory[0].options[0].id;
      }
    }

    setCurrentCategory(newCurrentCategory);
    setIncident({ ...incident, categoryId, propertyId, optionId });
  }, [currentIdCategory, currentIdProperty, currentIdOption]);

  //Функция собирающая из списка и функции изменения состояния номера элемент html
  const listSelect = (list, setCurrent, title) => (
    <CreateIncidentModalSelect
      list={list}
      onChange={(event) => setCurrent(Number(event.target.value))}
      title={title}
    />
  );

  const dispatch = useDispatch();
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(incidentFetching('post', incident));
    handleClose();
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Создание инцидента</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" disabled value={`${incident.name}`} />
            <Form.Text className="text-muted">
              Если имя в этом поле не совпадает с Вашим, обратитесь к
              администратору.
            </Form.Text>
          </Form.Group>

          {listSelect(list, setCurrentIdCategory, 'Выберите категорию')}
          {listSelect(currentCategory[0].properties, setCurrentIdProperty)}
          {listSelect(currentCategory[0].options, setCurrentIdOption)}

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Содержание обращения</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={incident.text}
              placeholder="Опишите подробно ситуацию"
              onChange={(event) => {
                setIncident({ ...incident, text: event.target.value });
              }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default memo(CreateIncidentModel);
