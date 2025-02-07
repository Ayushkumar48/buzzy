export type task = {
  name: string;
  description: string;
  date: Date;
  time: string;
  priority: 1 | 2 | 3 | 4;
  saveTo: string;
  projectId: number | null;
  id?: number;
};

export type project = {
  id: number;
  name: string;
  colorName: string;
  color: string;
};
