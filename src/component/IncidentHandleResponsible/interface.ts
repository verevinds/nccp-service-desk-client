export interface IIncidentHandleResponsible {
  show?: boolean;
  onHide: () => void;
  currentResponsible?: number | undefined;
}
type TParams = { incidentData?: any; comment?: string };
export type IUser = {
  number: number;
};
