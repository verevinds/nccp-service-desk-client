import React, { memo, Fragment } from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './styles.module.scss';
export interface ISpinner {}

const SpinnerGrow: React.FC<ISpinner> = (props) => {
  return (
    <Fragment>
      <div className={`flex flex_center align_items-center ${styles.text}`}>
        <Spinner animation="grow" variant="info" {...props} /> <span>Загрузка...</span>
      </div>
    </Fragment>
  );
};

export default memo(SpinnerGrow);
