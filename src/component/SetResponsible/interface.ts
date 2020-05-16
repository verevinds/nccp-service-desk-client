import { IModalWindow } from '../ModalWindow/interface';

export interface ISetResponsible {
  show?: boolean;
  onHide?: () => void | undefined;
  currentResponsible?: number | undefined;
  onClick?: () => void;
}
