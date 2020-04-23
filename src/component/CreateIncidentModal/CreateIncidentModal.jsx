import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CreateIncidentModalSelect from '../CreateIncidentModalSelect/CreateIncidentModalSelect';

/**Bootstrap components */
import { Modal, Button, Form } from 'react-bootstrap';

const onSubmit = (event) => {
  event.preventDefault();
};
const handlePriority = (category2, incident) => {
  return category2.find((item) => item.id == incident.category2).priorityId;
};
const CreateIncidentModel = ({ handleClose, showModal }) => {
  const { user } = useSelector((state) => state.auth.users);
  const [incident, setIncident] = useState({
    number: null,
    startWork: '',
    dateCreate: '',
    currentResponsible: '',
    text: '',
    priority: 0,
    status: 0,
    departmentId: user.departmentId,
    positionId: user.positionId,
    name: `${user.name1} ${user.name2} ${user.name3}`,
    email: user.email,
    number: user.number,
    phone1: user.phone1,
    phone2: user.phone2,
    category1: 1,
    category2: 1,
    category3: 1,
  });

  useEffect(() => {
    setIncident({
      ...incident,
      priority: handlePriority(category2, incident),
    });
  }, []);
  useEffect(() => {
    console.log('incident', incident);
    // console.log(
    //   'find',
    //   category2.find((item) => item.id == incident.category2).priorityId,
    // );
  }, [incident]);
  const category1 = [
    { id: 1, name: 'Техника' },
    { id: 2, name: 'Программное обеспечение' },
    { id: 4, name: 'Эксплуатация' },
  ];

  const category2 = [
    { id: 1, name: 'Замена принтера', category1Id: 1, priorityId: 2 },
    { id: 2, name: 'Ремонт принтера', category1Id: 1, priorityId: 1 },
    { id: 3, name: 'Устранение неполадок', category1Id: 2, priorityId: 3 },
    { id: 5, name: 'Ремонт двери', category1Id: 4, priorityId: 5 },
    { id: 6, name: 'Замена замков', category1Id: 4, priorityId: 4 },
  ];
  useEffect(() => {
    setIncident({
      ...incident,
      priority: handlePriority(category2, incident),
    });
  }, [incident.category2, incident.category1]);
  const category2Filter = category2.filter(
    (category2) => category2.category1Id === incident.category1,
  );
  if (category2Filter.length) {
    var category2Component = (
      <CreateIncidentModalSelect
        handleCategory={(event) => {
          setIncident({
            ...incident,
            category2: Number(event.target.value),
            category3: 1,
          });
        }}
        category={category2Filter}
      />
    );
  }
  const category3 = [
    { id: 1, name: 'XEROX 1020', category1Id: 1 },
    { id: 2, name: 'XEROX 2200', category1Id: 1 },
    { id: 3, name: '1С:Бухгалтерия', category1Id: 2 },
    { id: 4, name: 'Microsoft Office', category1Id: 2 },
  ];
  const category3Filter = category3.filter(
    (category3) => category3.category1Id === incident.category1,
  );
  if (category3Filter.length) {
    var category3Component = (
      <CreateIncidentModalSelect
        handleCategory={(event) => {
          setIncident({
            ...incident,
            category2: Number(event.target.value),
            category3: 1,
          });
        }}
        category={category3Filter}
      />
    );
  }

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
          <CreateIncidentModalSelect
            handleCategory={(event) =>
              setIncident({
                ...incident,
                category1: Number(event.target.value),
                category2: 1,
                category3: 1,
              })
            }
            category={category1}
            title={`Выберите категорию`}
          />
          {category2Component}
          {category3Component}

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
