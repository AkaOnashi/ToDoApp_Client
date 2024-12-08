export enum TaskStatuses {
    ToDo = "To Do",
    InProgress = "In Progress",
    Done = "Done",
  }

export const TaskStatusMapping: Record<number, TaskStatuses> = {
  0: TaskStatuses.ToDo,
  1: TaskStatuses.InProgress,
  2: TaskStatuses.Done,
};

export const mapBackendStatusToEnum = (status: number): TaskStatuses => {
  return TaskStatusMapping[status] || TaskStatuses.ToDo; 
};

export const TaskStatusReverseMapping: Record<TaskStatuses, number> = {
  [TaskStatuses.ToDo]: 0,
  [TaskStatuses.InProgress]: 1,
  [TaskStatuses.Done]: 2,
};

export const mapEnumStatusToBackend = (status: TaskStatuses ): number => {
  return TaskStatusReverseMapping[status] || 0; 
};