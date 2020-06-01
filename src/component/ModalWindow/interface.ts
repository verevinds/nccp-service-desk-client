export interface IModalWindow {
  title?: string | undefined;
  body?: string | undefined;
  textOk?: string | undefined;
  textNot?: string | undefined;
  onOk?: () => void;
  onHide?: () => void | undefined;
  show?: boolean;
  onSubmit?: (() => void) | void;
  children?: Element | React.ReactElement<any> | undefined;
  validated?: boolean | undefined;
  size?: 'lg' | 'sm';
}
