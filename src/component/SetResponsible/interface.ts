export interface ISetResponsible {
  show?: boolean;
  onHide?: (() => void) | undefined;
  currentResponsible?: number | undefined;
  onClick?:
    | ((number?: number | null | undefined, text?: string) => void)
    | undefined;
}

export interface ISetResponsibleButton {
  incident: any;
  currentResponsible: number | null;
  currentResponsibleFullname: any;
  onClick:
    | ((number?: number | null | undefined, text?: string) => void)
    | undefined;
  onHide: (() => void) | undefined;
}
