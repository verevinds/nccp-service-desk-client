export interface IModalWindow {
  title: string | undefined;
  body: string | undefined;
  textOk: string | undefined;
  textNot: string | undefined;
  onOk: () => void | undefined;
  onHide: () => void | undefined;
  show: boolean;
  onSubmit: () => void | undefined;
  validated: boolean | undefined;
}
