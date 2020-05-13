export interface ISidebar {
  title: string;
  list: [
    {
      id: number;
      name: string;
      createdAt: string;
      status: string | undefined | null;
      responsible: string | undefined | null;
    },
  ];
  isLoading: boolean;
  onClick: () => undefined;
  badge: boolean;
  activeId: number;
}
