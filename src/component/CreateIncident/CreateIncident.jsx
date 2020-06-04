import React, { memo, useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

//** My components */
import CreateIncidentSelect from '../CreateIncidentSelect/CreateIncidentSelect';
import ModalWindow from '../ModalWindow/ModalWindow';
import UploadFiles from '../UploadFiles/UploadFiles';
import { fileUpload } from '../UploadFiles/fileUpload';
import { AlertContext } from '../Alert/AlertContext';

/** Action creators */
import { incidentFetching } from '../../redux/actionCreators/incidentAction';

/**Bootstrap components */
import { Form } from 'react-bootstrap';

const CreateIncidentModel = ({ handleClose, showModal, list, user }) => {
  const dispatch = useDispatch();
  const setAlert = useContext(AlertContext);
  // eslint-disable-next-line
  const parsed = queryString.parse(window.location.search);
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
  const [currentIdCategory, setCurrentIdCategory] = useState(incident.categoryId);
  const [currentIdProperty, setCurrentIdProperty] = useState(incident.propertyId);
  const [currentIdOption, setCurrentIdOption] = useState(incident.optionId);
  const [file, setFile] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(list.filter((item) => item.id === currentIdCategory));
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);

  useEffect(() => {
    setCurrentProperties(currentCategory[0].properties);
  }, [currentCategory]);

  useEffect(() => {
    currentProperties[0] ? setCurrentIdProperty(currentProperties[0].id) : setCurrentIdProperty(null);
  }, [currentProperties]);

  useEffect(() => {
    currentOptions[0] ? setCurrentIdOption(currentOptions[0].id) : setCurrentIdOption(null);
  }, [currentOptions]);

  useEffect(() => {
    let options = currentCategory[0].options;
    let newOptions = [];

    options.forEach((item) => {
      if (item.bind.length) {
        let isBind = false;

        item.bind.forEach((item) => {
          if (item.propertyId === currentIdProperty) {
            isBind = true;
          } else {
            isBind = false;
          }
        });

        if (isBind) newOptions.push(item);
      }
    });

    if (!!newOptions.length) {
      setCurrentOptions(newOptions);
    } else {
      newOptions = options.filter((item) => {
        let isBind = true;

        item.bind.forEach((item) => {
          if (item.propertyId !== currentIdProperty) isBind = false;
        });

        return isBind;
      });
    }

    setCurrentOptions(newOptions);
  }, [currentIdProperty, currentCategory]);

  //? Устанавливаем эффект на каждое изменение состояния номера текущей категории
  useEffect(() => {
    const newCurrentCategory = list.filter((item) => item.id === currentIdCategory);
    setCurrentCategory(newCurrentCategory);
  }, [currentIdCategory, list]);
  useEffect(() => {
    setIncident({
      ...incident,
      departmentId: currentCategory[0].departmentId,
      categoryId: currentIdCategory,
      propertyId: currentIdProperty,
      optionId: currentIdOption,
    });
    // eslint-disable-next-line
  }, [currentIdCategory, currentIdProperty, currentIdOption, currentCategory]);

  //Функция собирающая из списка и функции изменения состояния номера элемент html
  const listSelect = (list, setCurrent, title) => {
    if (list.length)
      return (
        <CreateIncidentSelect list={list} onChange={(event) => setCurrent(Number(event.target.value))} title={title} />
      );
  };

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
          Если имя в этом поле не совпадает с Вашим, обратитесь к администратору.
        </Form.Text>
      </Form.Group>

      {listSelect(list, setCurrentIdCategory, 'Выберите категорию')}
      {listSelect(currentProperties, setCurrentIdProperty)}
      {listSelect(currentOptions, setCurrentIdOption)}

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
