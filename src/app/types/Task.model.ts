import { TaskStatuses } from "./TaskStatuses";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatuses;
  };