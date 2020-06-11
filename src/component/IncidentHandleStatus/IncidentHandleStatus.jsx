import React, { memo, useState, useContext } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';
import { Form } from 'react-bootstrap';
import UploadFiles from '../UploadFiles/UploadFiles';
import { fileUpload } from '../UploadFiles/fileUpload';
import { AlertContext } from '../Alert/AlertContext';
import { fileFetching } from '../../redux/actionCreators/fileAction';

const IncidentHandleStatus = ({ show, onHide, incident }) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.status, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [fullName] = useState(`${user.name1} ${user.name2} ${user.name3}`);
  const [validated, setValidated] = useState(false);
  const [newStatus, setNewStatus] = useState({ statusId: incident.statusId });
  const [newComment, setNewComment] = useState();
  //? Инициализируем состояние выбранного файла
  const [file, setFile] = useState(null);
  const setAlert = useContext(AlertContext);
  const handleStatus = (event) => {
    setNewStatus({ statusId: Number(event.target.value) });
  };

  const uploadFile = async (file) => {
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
    dispatch(
      fileFetching({
        file: dataFile,
        incidentId: incident.id,
        userNumber: user.number,
      }),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const fnNewComment = (text) => {
      const data = {
        text,
        userNumber: user.number,
        incidentId: incident.id,
      };
      dispatch(
        queryApi({
          route: 'comments',
          method: 'post',
          data,
          id: incident.id,
        }),
      );
    };
    if (form.checkValidity()) {
      uploadFile(file);

      if (newStatus.statusId !== incident.statusId) {
        fnNewComment(`${fullName} изменил статус на "${list.find((item) => item.id === newStatus.statusId).name}"`);
      }
      fnNewComment(newComment);

      dispatch(
        queryApi({
          route: 'incidents',
          method: 'put',
          actionUpdate: incidentCreate,
          data: newStatus,
          id: incident.id,
        }),
      );
      onHide();
    }
    setValidated(true);
  };
  if (list.length) {
    return (
      <ModalWindow
        show={show}
        title={'Изменение инцидента'}
        onHide={onHide}
        textOk={'Сохранить'}
        onSubmit={handleSubmit}
        validated={validated}
      >
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Изменить статус</Form.Label>
          <Form.Control
            as="select"
            defaultValue={list.find((item) => item.id === incident.statusId).id}
            onChange={handleStatus}
          >
            {list
              .sort((a, b) => {
                if (a.id < b.id) {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Комментарий</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            required
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">Обязательно нужно указать комментарий!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <UploadFiles setFile={setFile} />
        </Form.Group>
      </ModalWindow>
    );
  } else {
    return <></>;
  }
};

export default memo(IncidentHandleStatus);
