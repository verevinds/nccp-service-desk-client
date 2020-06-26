import React, { memo } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';

export interface IIncidentHandleVise {
  show: boolean;
  onHide: () => void;
}

const IncidentHandleVise: React.FC<IIncidentHandleVise> = ({ show, onHide }) => {
  return <ModalWindow show={show} onHide={onHide}></ModalWindow>;
};

export default memo(IncidentHandleVise);
