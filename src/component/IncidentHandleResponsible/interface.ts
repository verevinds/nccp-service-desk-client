export interface IIncidentHandleResponsible {
  show?: boolean;
  onHide: () => void;
  currentResponsible?: number | undefined;
  onClick: (number?: number | null | undefined, text?: string) => void;
}
export interface IIncidentHandleResponsibleButton {
  incident: any;
  currentResponsible: number | null;
  currentResponsibleFullname: any;
  onClick: (number?: number | null | undefined, text?: string) => void;
  onHide: (() => void) | undefined;
}

export type IUser = {
  number: number;
};
