import React, { memo, useRef, useState, useEffect, useContext } from 'react';
import './styles.css';

import { AlertContext } from '../Alert/AlertContext';
//? Font Awesome иконки
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheck } from '@fortawesome/free-solid-svg-icons';

interface IInputFile {
  setFile: (file: FileList) => void;
}
const InputFile: React.FC<IInputFile> = ({ setFile }) => {
  const file = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const setAlert = useContext(AlertContext);

  useEffect(() => {
    if (!!fileName)
      setAlert({
        type: 'success',
        text: `Выбран файл ${fileName}`,
        autoClose: 4000,
      });
  }, [fileName, setAlert]);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!!file)
      if (!!file.current)
        if (!!file.current.files) {
          setFileName(file.current.files[0].name);
          if (!!setFile) setFile(file.current.files);
        }
  };

  return (
    <>
      <div className="input-group flex-nowrap">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">
            Вложение:{' '}
          </span>
        </div>
        <div className="files-input">
          <input
            type="file"
            name="file"
            id="file"
            className="input-file"
            ref={file}
            onChange={onChange}
          />
          <label htmlFor="file" className="btn btn-tertiary js-labelFile">
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
