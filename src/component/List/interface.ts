export interface IList {
  title: string | undefined;
  list: [
    {
      id: number;
      name: string;
      createdAt: string;
      noChange: boolean | undefined;
    },
  ];
  onSubmit: () => void;
  onDelete: () => void;
  onClick: () => void;
  activeId: number | undefined;
  inputOff: boolean | undefined;
  pointer: boolean | undefined;
}
