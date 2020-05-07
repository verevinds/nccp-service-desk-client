export interface ISidebar {
  title: string;
  list: [{ id: number; name: string; createdAt: string }];
  isLoading: boolean;
  onClick: () => undefined;
  activeId: number;
}
