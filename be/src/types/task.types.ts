export interface ITask {
  id: string;
  userID: string;
  categoryID: string;
  todo: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  isDone: boolean;
}

export type PickCreateTask = Pick<ITask, "todo" | "endAt">;
export type PickTaskID = Pick<ITask, "id">;
export type PickIsDone = Pick<ITask, "isDone">;
