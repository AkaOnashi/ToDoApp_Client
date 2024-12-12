import { TaskStatuses } from "../app/types/TaskStatuses";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatuses;
  };