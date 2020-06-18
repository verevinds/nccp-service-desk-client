export interface IIncidentHandleResponsible {
  show?: boolean;
  onHide: () => void;
  currentResponsible?: number | undefined;
  onClick: (arg0?: TParams) => void;
}
type TParams = { incidentData?: any; comment?: string };
export type IUser = {
  number: number;
};
