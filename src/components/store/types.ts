export type task = {
  id: number;
  name: string;
  description: string;
  date: Date;
  time: string;
  priority: 1 | 2 | 3 | 4;
  saveTo: string;
};
