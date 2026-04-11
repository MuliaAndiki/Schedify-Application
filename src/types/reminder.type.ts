export interface IReminder {
  id: string;
  taskID: string;
  reminded: string;
  createdAt: string;
  updatedAt: string;
}

export type PickReminderID = Pick<IReminder, "id">;
export type PIckCreateReminder = Pick<IReminder, "reminded" | "taskID">;
