import React, { memo } from 'react';
import styles from './styles.module.css';
import { Button } from 'react-bootstrap';
import { IIncidentHandleResponsibleButton } from './interface';

const SetResponsibleButton = ({
  incident,
  currentResponsible,
  currentResponsibleFullname,
  onClick,
  onHide,
}: IIncidentHandleResponsibleButton) => {
  if (!!onClick && !!onHide) {
    return (
      <div className={styles.button_group}>
        <Button
          variant="success"
          onClick={() => {
            onClick(currentResponsible, currentResponsibleFullname);
            onHide();
          }}
          disabled={
            Number(currentResponsible) !== 0 &&
            Number(currentResponsible) !== Number(incident.currentResponsible)
              ? false
              : true
          }
        >
          Сохранить
        </Button>
      </div>
    );
  } else return null;
};

export default memo(SetResponsibleButton);
