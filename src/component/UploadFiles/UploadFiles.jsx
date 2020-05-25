import React, { memo, useRef, useState, useEffect } from 'react';
import Alert from '../Alert/Alert';
import './styles.css';

//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheck } from '@fortawesome/free-solid-svg-icons';

const InputFile = ({ callback }) => {
  const inputEl = useRef(null);
  const [fileName, setFileName] = useState(undefined);
  const [alert, setAlert] = useState(undefined);

  useEffect(() => {
    if (!!fileName)
      setAlert(
        <Alert
          type={'info'}
          text={`Выбран файл ${fileName}`}
          autoClose={4000}
        />,
      );
  }, [fileName]);

  const onChange = (event) => {
    setFileName(inputEl.current.files[0].name);
  };

  return (
    <>
      {alert}
      <div class="input-group flex-nowrap">
        <div class="input-group-prepend">
          <span class="input-group-text" id="addon-wrapping">
            Вложение:{' '}
          </span>
        </div>
        <div className="files-input">
          <input
            type="file"
            name="file"
            id="file"
            className="input-file"
            ref={inputEl}
            onChange={onChange}
          />
          <label for="file" className="btn btn-tertiary js-labelFile">
            <FontAwesomeIcon
              icon={fileName ? faCheck : faUpload}
              color={fileName ? '#155724' : '#495057'}
            />{' '}
            <span className="js-fileName">{fileName || `Загрузить файл`}</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default memo(InputFile);
