import React, { memo, useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment-business-days';
import { toast } from 'react-toastify';
import { nameUser, findById } from '../../js/supportingFunction';
//** My components */
import CreateIncidentSelect from '../CreateIncidentSelect/CreateIncidentSelect';
import ModalWindow from '../ModalWindow/ModalWindow';
import UploadFiles from '../UploadFiles/UploadFiles';
import { fileUpload } from '../UploadFiles/fileUpload';
import { useSelector } from 'react-redux';

/** Action creators */
import { incidentFetching, incidentCreate } from '../../redux/actionCreators/incidentAction';

/**Bootstrap components */
import { Form, InputGroup } from 'react-bootstrap';
import CreateIncidentDefault from '../CreateIncidentDefault/CreateIncidentDefault';
import CreateIncidentCustom from '../CreateIncidentCustom/CreateIncidentCustom';
import { queryApi } from '../../redux/actionCreators/queryApiAction';

const CreateIncidentModel = ({ handleClose, showModal, isModify }) => {
  const { isFinishTime } = useSelector((state) => state.setting);
  const user = useSelector((state) => state.auth.user);
  const { list } = useSelector((state) => state.catalog);
  const chooseIncident = useSelector((state) => state.incidents.current.incident);
  moment.updateLocale('ru', {
    workingWeekdays: [1, 2, 3, 4, 5],
  });
  const [state, setState] = useState(isModify && chooseIncident.params ? [...chooseIncident.params] : []);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const parsed = queryString.parse(window.location.search);
  const dateNow = new Date();

  const [currentIdDepartment, setCurrentIdDepartment] = useState(isModify ? chooseIncident?.departmentId : '');
  const [currentIdCategory, setCurrentIdCategory] = useState(isModify ? chooseIncident?.categoryId : '');
  const [currentIdProperty, setCurrentIdProperty] = useState(isModify ? chooseIncident?.propertyId : '');
  const [currentIdOption, setCurrentIdOption] = useState(null);
  const [finishWork, setFinishWork] = useState(isModify ? chooseIncident.finishWork : '');
  const [text, setText] = useState(isModify ? chooseIncident?.text : '');
  const [file, setFile] = useState(null);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentProperties, setCurrentProperties] = useState([]);
  const [property, setProperty] = useState({});
  const [options, setOptions] = useState({});
  const [params, setParams] = useState(isModify ? chooseIncident.params : null);
  const [validated, setValidated] = useState(false);

  const incident = useMemo(() => {
    let allowToCreate = isModify
      ? undefined
      : {
          startWork: isModify ? chooseIncident.startWork : null,

          statusId: 0,
          allowToCreate: user.position.level > 0 ? true : false,
          allowToCreateWork: user.position.level > 0 ? new Date() : null,
          receiveAt: user.position.level > 0 ? new Date() : null,
        };
    return {
      dateCreate: isModify
        ? chooseIncident.dateCreate
        : `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
      currentResponsible: isModify ? chooseIncident.currentResponsible : null,
      text,
      level: 0,
      departmentId: currentIdDepartment,
      positionId: null,
      name: nameUser(user)?.fullName(),
      email: user.email,
      userNumber: user.number,
      phone1: user.phone1,
      phone2: user.phone2,
      finishWork: finishWork,
      categoryId: currentIdCategory,
      propertyId: currentIdProperty,
      optionId: currentIdOption,
      initiatorDepartmentParent: user.department.parent,
      initiatorDepartment: user.department.id,
      ...allowToCreate,
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
    chooseIncident,
    isModify,
  ]);

  useEffect(() => {
    console.log('incident', incident);
  }, [incident]);

  useEffect(() => {
    if (isModify) {
      setCurrentIdDepartment(chooseIncident?.departmentId);
      setCurrentIdCategory(chooseIncident?.categoryId);
      setCurrentIdProperty(chooseIncident?.propertyId);
      setCurrentIdOption(chooseIncident?.optionId);
    }
  }, [chooseIncident, isModify]);

  useEffect(() => {
    !isModify && setCurrentIdProperty(null);
  }, [currentIdCategory, isModify]);
  useEffect(() => {
    !isModify && setCurrentIdOption(null);
  }, [currentIdProperty, isModify]);

  useEffect(() => {
    Array.isArray(options?.params) && setState([...options?.params]);
  }, [options]);

  useEffect(() => {
    let properties = currentCategory[0]?.properties.filter((item) => !item.isArchive);

    setCurrentProperties(properties);
  }, [currentCategory]);

  useEffect(() => {
    if (currentCategory) {
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
    }
  }, [currentIdProperty, currentCategory]);

  useEffect(() => {
    if (currentProperties) {
      const property = findById(currentProperties, currentIdProperty);
      const date = new Date();
      const finishWork = new Date(moment(date, 'DD-MM-YYYY').businessAdd(property?.deadline - 1)._d).toISOString();
      property && !isModify && setFinishWork(finishWork);

      setProperty(property);
    }
  }, [currentIdProperty, currentProperties, isModify]);

  useEffect(() => {
    const option = findById(currentOptions, currentIdOption);

    setOptions(option);
  }, [currentIdOption, currentOptions]);
  //? Устанавливаем эффект на каждое изменение состояния номера текущей категории
  useEffect(() => {
    if (currentIdCategory) {
      const newCurrentCategory = list.filter((item) => item.id === currentIdCategory);
      setCurrentIdDepartment(newCurrentCategory[0].departmentId);
      let categories = newCurrentCategory.filter((item) => !item.isArchive);
      setCurrentCategory(categories);
    }
  }, [currentIdCategory, list]);

  useEffect(() => {
    // console.log(property);
  }, [property]);
  //Функция собирающая из списка и функции изменения состояния номера элемент html
  const listSelect = (list, setCurrent, title, currentId) => {
    if (list?.length)
      return (
        <CreateIncidentSelect
          list={list}
          onChange={(event) => setCurrent(Number(event.target.value))}
          currentId={currentId}
          title={title}
          isModify={isModify}
        />
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
        let text = undefined;
        if (statusFileUpload.data.wasFile) {
          text = statusFileUpload.data.message;
        } else {
          text = `Вы не прикрепили файл`;
        }
        toast(text, { autoClose: 5000 });
        dataFile = statusFileUpload.data;
      } else {
      }
      if (isModify) {
        let statusId = chooseIncident.hasVisa ? 1 : 8388606;
        dispatch(
          queryApi({
            route: 'incidents',
            method: 'put',
            data: { ...incident, statusId },
            id: chooseIncident.id,
          }),
        );
        dispatch(
          queryApi({
            route: 'comments',
            method: 'post',
            actionUpdate: incidentCreate,
            data: { text: 'Заявка доработана', incidentId: chooseIncident.id, userNumber: user.number },
          }),
        );
      } else await dispatch(incidentFetching(data, dataFile));
      await setState([]);
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
      textOk={isModify ? 'Сохранить' : 'Отправить'}
      textNot={'Отменить'}
      validated={validated}
      size={options?.params?.length > 2 ? 'lg' : undefined}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Control type="text" disabled value={`${incident.name}`} />
        <Form.Text className="text-muted">
          Если имя в этом поле не совпадает с Вашим, обратитесь к администратору.
        </Form.Text>
      </Form.Group>

      {listSelect(list, setCurrentIdCategory, 'Выберите категорию', currentIdCategory)}
      {listSelect(currentProperties, setCurrentIdProperty, '', currentIdProperty)}
      {!!currentIdProperty ? listSelect(currentOptions, setCurrentIdOption, '', currentIdOption) : undefined}
      {Array.isArray(state) && state.length ? (
        <CreateIncidentCustom setParams={setParams} state={state} setState={setState} />
      ) : (
        <CreateIncidentDefault text={text} setText={setText} />
      )}
      {!isModify ? (
        <>
          <Form.Group>
            <UploadFiles setFile={setFile} />
          </Form.Group>
          {!isFinishTime ? undefined : (
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Срок выполнения</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="date"
                value={finishWork?.slice(0, 10)}
                min={new Date(moment(new Date(), 'DD-MM-YYYY').businessAdd(property?.deadline - 1)._d)
                  .toISOString()
                  .slice(0, 10)}
                onChange={(event) =>
                  setFinishWork(new Date(`${event.currentTarget.value}${finishWork?.slice(10)}`).toISOString())
                }
              />
            </InputGroup>
          )}
        </>
      ) : undefined}
    </ModalWindow>
  );
};

export default memo(CreateIncidentModel);
