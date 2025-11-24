import { ITask } from "../schema";

export type FormCreateTask = Pick<ITask, "todo" | "endAt">;
export type PickTaskId = Pick<ITask, "id">;
export type PickTaskCategoryId = Pick<ITask, "categoryID">;
