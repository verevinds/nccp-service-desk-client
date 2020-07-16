export interface IIncidentHandleDepartment {
  show?: boolean;
  onHide?: (() => void) | undefined;
  currentResponsible?: number | undefined;
}
