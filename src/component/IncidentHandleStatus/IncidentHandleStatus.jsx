import React, { memo, useState, useMemo } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { queryApi } from '../../redux/actionCreators/queryApiAction';
import { incidentCreate } from '../../redux/actionCreators/incidentAction';
import { Form } from 'react-bootstrap';
import UploadFiles from '../UploadFiles/UploadFiles';
import { fileUpload } from '../UploadFiles/fileUpload';
import { fileFetching } from '../../redux/actionCreators/fileAction';
import { toast } from 'react-toastify';

const IncidentHandleStatus = ({ show, onHide, inWork, isModify }) => {
  const dispatch = useDispatch();
  let status = useSelector((state) => state.status.list, shallowEqual);
  const { incident } = useSelector((state) => state.incidents.current, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [fullName] = useState(`${user.name1} ${user.name2} ${user.name3}`);
  const [validated, setValidated] = useState(false);
  const [newStatus, setNewStatus] = useState({
    statusId: inWork || isModify ? 1 : incident.statusId,
  });
  const [newComment, setNewComment] = useState();
  const [file, setFile] = useState(null);

  let selectStatus = status;

  status = [];
  selectStatus.forEach((item) => {
    let isBind = true;
    let isBindItem = false;
    if (!!item.bind.length) {
      isBind = false;
      item.bind.forEach((bind) => {
        if (bind.item.id === incident.categoryId) {
          isBindItem = true;
        }
      });
    }
    let newStatus = isBind || isBindItem ? item : undefined;
    if (!!newStatus) return status.push(newStatus);
    else return;
  });

  const list = useMemo(() => status.filter((item) => item.id !== 8388608 && item.id !== 8388606), [status]);
  //? Инициализируем состояние выбранного файла
  const handleStatus = (event) => {
    setNewStatus({
      statusId: Number(event.target.value),
      doneWork: Number(event.target.value) === 8388607 ? new Date() : null,
    });
  };

  const uploadFile = async (file) => {
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
          userNumber: user.number,
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
        title={'Изменение заявgки'}
        onHide={onHide}
        textOk={'Сохранить'}
        onSubmit={handleSubmit}
        validated={validated}
      >
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Изменить статус</Form.Label>
          <Form.Control
            as="select"
            defaultValue={inWork || isModify ? 1 : list.find((item) => item.id === incident.statusId).id}
            onChange={handleStatus}
            disabled={inWork || isModify}
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
