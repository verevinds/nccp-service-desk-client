import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import CreateIncidentModalSelect from '../CreateIncidentModalSelect/CreateIncidentModalSelect';

/**Bootstrap components */
import { Modal, Button, Form } from 'react-bootstrap';

const CreateIncidentModel = ({ handleClose, showModal }) => {
  const {
    auth: { user },
    catalog: { list },
  } = useSelector((state) => state);

  const [incident, setIncident] = useState({
    startWork: '',
    dateCreate: '',
    currentResponsible: '',
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
    category: 1,
    property: 1,
    option: 1,
  });

  //? Создать селектор категории

  const selectCategory = (
    <CreateIncidentModalSelect
      onChange={(event) => {
        setIncident({
          ...incident,
          category: Number(event.target.value),
          property: 1,
          option: 1,
        });
      }}
      category={list}
      title={`Выберите категорию`}
    />
  );

  const currentCategory = list.filter(
    (item) => item.id === incident.category,
  )[0];
  const selectProperty = (
    <CreateIncidentModalSelect
      onChange={(event) => {
        setIncident({
          ...incident,
          property: Number(event.target.value),
          option: 1,
        });
      }}
      category={currentCategory.properties}
    />
  );
  const selectOption = (
    <CreateIncidentModalSelect
      onChange={(event) => {
        setIncident({
          ...incident,
          option: Number(event.target.value),
        });
      }}
      category={currentCategory.options}
    />
  );

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(incident);
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
          {list.length > 0 ? selectCategory : null}
          {currentCategory.properties.length > 0 ? selectProperty : null}
          {currentCategory.options.length > 0 ? selectOption : null}
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
