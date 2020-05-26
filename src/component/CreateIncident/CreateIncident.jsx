import React, { memo, useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import openSocket from 'socket.io-client';

//** My components */
import CreateIncidentSelect from '../CreateIncidentSelect/CreateIncidentSelect';
import ModalWindow from '../ModalWindow/ModalWindow';
import UploadFiles from '../UploadFiles/UploadFiles';
import { fileUpload } from '../UploadFiles/fileUpload';
import { AlertContext } from '../Alert/AlertContext';

/** Action creators */
import {
  incidentFetching,
  incidentCreate,
} from '../../redux/actionCreators/incidentAction';

/**Bootstrap components */
import { Form } from 'react-bootstrap';
import { queryApi } from '../../redux/actionCreators/queryApiAction';

const socket = openSocket('http://192.168.213.77:8000/');

const CreateIncidentModel = ({ handleClose, showModal, list, user }) => {
  const setAlert = useContext(AlertContext);

  const dateNow = new Date();
  const [incident, setIncident] = useState({
    startWork: null,
    dateCreate: `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
    currentResponsible: null,
    text: '',
    level: 0,
    statusId: 0,
    departmentId: null,
    positionId: null,
    name: `${user.name1} ${user.name2} ${user.name3}`,
    email: user.email,
    userNumber: user.number,
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

  //? Инициализируем состояние выбранного файла
  const [file, setFile] = useState(null);

  //? Устанавливаем эффект на каждое изменение состояния номера текущей категории
  useEffect(() => {
    let categoryId = currentIdCategory;
    let propertyId = currentIdProperty;
    let optionId = currentIdOption;

    // console.log('categoryId', categoryId);
    // console.log('propertyId', propertyId);
    // console.log('optionId', optionId);

    const newCurrentCategory = list.filter(
      (item) => item.id === currentIdCategory,
    );

    if (categoryId !== incident.categoryId) {
      if (!!newCurrentCategory[0].properties[0]) {
        propertyId = newCurrentCategory[0].properties[0].id;
      } else propertyId = null;
      if (!!newCurrentCategory[0].options[0]) {
        optionId = newCurrentCategory[0].options[0].id;
      } else optionId = null;
    }
    setCurrentCategory(newCurrentCategory);
    setIncident({
      ...incident,
      departmentId: currentCategory[0].departmentId,
      categoryId,
      propertyId,
      optionId,
    });
    // eslint-disable-next-line
  }, [currentIdCategory, currentIdProperty, currentIdOption]);

  //Функция собирающая из списка и функции изменения состояния номера элемент html
  const listSelect = (list, setCurrent, title) => {
    if (list.length)
      return (
        <CreateIncidentSelect
          list={list}
          onChange={(event) => setCurrent(Number(event.target.value))}
          title={title}
        />
      );
  };

  const dispatch = useDispatch();
  const onSubmit = async (event) => {
    event.preventDefault();
    let data = incident;
    let dataFile;
    let statusFileUpload = await fileUpload(file ? file[0] : '');
    if (statusFileUpload.status === Number(200)) {
      let type = undefined;
      let text = undefined;
      if (statusFileUpload.data.wasFile) {
        type = 'success';
        text = statusFileUpload.data.message;
      } else {
        text = `Вы не прикрепили файл`;
      }
      setAlert({
        autoClose: 3000,
        type,
        text,
      });
      dataFile = statusFileUpload.data;
    } else {
      setAlert({
        autoClose: 5000,
        type: 'warn',
        text: `Невозможно прикрепить файл: ${statusFileUpload}`,
      });
    }
    await dispatch(incidentFetching(data, dataFile));
    await socket.emit('newIncident', currentCategory[0].departmentId);
    // socket.emit('departmentId', currentCategory[0].departmentId);
    await handleClose();
  };

  return (
    <ModalWindow
      show={showModal}
      onHide={handleClose}
      title={'Создание инцидента'}
      onSubmit={onSubmit}
      textOk={'Отправить'}
      textNot={'Отменить'}
    >
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
      <Form.Group>
        <UploadFiles setFile={setFile} />
      </Form.Group>
    </ModalWindow>
  );
};

export default memo(CreateIncidentModel);
