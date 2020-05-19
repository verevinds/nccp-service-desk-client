export interface IIncidentHandleResponsible {
  show?: boolean;
  onHide: () => void;
  currentResponsible?: number | undefined;
  onClick: (arg0?: TParams) => void;
}
type TParams = { bodyData?: any; comment?: string };
export type IUser = {
  number: number;
};
