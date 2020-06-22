import React, { memo, useState, useEffect, useContext, useMemo, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment-business-days';

//** My components */
import CreateIncidentSelect from '../CreateIncidentSelect/CreateIncidentSelect';
import ModalWindow from '../ModalWindow/ModalWindow';
import UploadFiles from '../UploadFiles/UploadFiles';
import { fileUpload } from '../UploadFiles/fileUpload';
import { AlertContext } from '../Alert/AlertContext';
import { useSelector } from 'react-redux';

/** Action creators */
import { incidentFetching } from '../../redux/actionCreators/incidentAction';

/**Bootstrap components */
import { Form } from 'react-bootstrap';
import CreateIncidentDefault from '../CreateIncidentDefault/CreateIncidentDefault';
import CreateIncidentCustom from '../CreateIncidentCustom/CreateIncidentCustom';

const CreateIncidentModel = ({ handleClose, showModal, user }) => {
  const { list } = useSelector((state) => state.catalog);
  moment.updateLocale('ru', {
    workingWeekdays: [1, 2, 3, 4, 5],
  });
  const dispatch = useDispatch();
  const setAlert = useContext(AlertContext);
  // eslint-disable-next-line
  const parsed = queryString.parse(window.location.search);
  const dateNow = new Date();

  const [currentIdDepartment, setCurrentIdDepartment] = useState(list[0] ? list[0].departmentId : null);
  const [currentIdCategory, setCurrentIdCategory] = useState(list[0] ? list[0].id : null);
  const [currentIdProperty, setCurrentIdProperty] = useState(list[0].properties[0] ? list[0].properties[0].id : null);
  const [currentIdOption, setCurrentIdOption] = useState(list[0].options[0] ? list[0].options[0].id : null);
  const [finishWork, setFinishWork] = useState(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(list.filter((item) => item.id === currentIdCategory));
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [property, setProperty] = useState({});
  const [params, setParams] = useState(null);
  const [validated, setValidated] = useState(false);

  const incident = useMemo(() => {
    return {
      startWork: null,
      dateCreate: `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
      currentResponsible: null,
      text,
      level: 0,
      statusId: 0,
      departmentId: currentIdDepartment,
      positionId: null,
      name: `${user.name1} ${user.name2} ${user.name3}`,
      email: user.email,
      userNumber: user.number,
      phone1: user.phone1,
      phone2: user.phone2,
      finishWork: finishWork,
      categoryId: currentIdCategory,
      propertyId: currentIdProperty,
      optionId: currentIdOption,
      params,
    };
  }, [
    currentIdDepartment,
    currentIdCategory,
    currentIdOption,
    currentIdProperty,
    dateNow,
    finishWork,
    text,
    user,
    params,
  ]);
  useEffect(() => {
    let properties = currentCategory[0]?.properties.filter((item) => !item.isArchive);

    setCurrentProperties(properties);
  }, [currentCategory]);

  useEffect(() => {
    Array.isArray(currentProperties) && currentProperties[0]
      ? setCurrentIdProperty(currentProperties[0].id)
      : setCurrentIdProperty(null);
  }, [currentProperties]);

  useEffect(() => {
    Array.isArray(currentOptions) && currentOptions[0]
      ? setCurrentIdOption(currentOptions[0].id)
      : setCurrentIdOption(null);
  }, [currentOptions]);

  useEffect(() => {
    let options = currentCategory[0]?.options;
    let newOptions = [];

    Array.isArray(options) &&
      options.forEach((item) => {
        if (item.bind.length) {
          let isBind = false;

          item.bind.forEach((item) => {
            if (item.propertyId === currentIdProperty) {
              isBind = true;
            }
          });

          if (isBind) newOptions.push(item);
        }
      });

    if (!!newOptions.length) {
      let options = newOptions.filter((item) => !item.isArchive);
      setCurrentOptions(options);
    } else {
      if (Array.isArray(options))
        newOptions = options.filter((item) => {
          let isBind = true;

          item.bind.forEach((item) => {
            if (item.propertyId !== currentIdProperty) isBind = false;
          });

          return isBind;
        });
    }

    options = newOptions.filter((item) => !item.isArchive);
    setCurrentOptions(options);
  }, [currentIdProperty, currentCategory, currentProperties]);

  useEffect(() => {
    const property = currentProperties.find((item) => item.id === currentIdProperty);
    const date = new Date();
    const finishWork = new Date(moment(date, 'DD-MM-YYYY').businessAdd(property?.deadline - 1)._d).toISOString();
    property && setFinishWork(finishWork);

    setProperty(currentProperties.find((item) => item.id === currentIdProperty));
  }, [currentIdProperty, currentProperties]);

  //? Устанавливаем эффект на каждое изменение состояния номера текущей категории
  useEffect(() => {
    const newCurrentCategory = list.filter((item) => item.id === currentIdCategory);
    setCurrentIdDepartment(newCurrentCategory[0].departmentId);
    let categories = newCurrentCategory.filter((item) => !item.isArchive);
    setCurrentCategory(categories);
  }, [currentIdCategory, list]);

  useEffect(() => {
    // console.log(property);
  }, [property]);
  //Функция собирающая из списка и функции изменения состояния номера элемент html
  const listSelect = (list, setCurrent, title) => {
    if (list?.length)
      return (
        <CreateIncidentSelect list={list} onChange={(event) => setCurrent(Number(event.target.value))} title={title} />
      );
  };

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
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
    }
    setValidated(true);
  };

  return (
    <ModalWindow
      show={showModal}
      onHide={handleClose}
      title={'Создание заявки'}
      onSubmit={onSubmit}
      textOk={'Отправить'}
      textNot={'Отменить'}
      validated={validated}
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

      {Array.isArray(property?.params) && property.params.length ? (
        <CreateIncidentCustom params={property.params} setParams={setParams} />
      ) : (
        <CreateIncidentDefault text={text} setText={setText} />
      )}
      <Form.Group>
        <UploadFiles setFile={setFile} />
      </Form.Group>
    </ModalWindow>
  );
};

export default memo(CreateIncidentModel);
