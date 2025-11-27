import { IReminder } from "../schema";

export type PickReminderID = Pick<IReminder, "id">;
export type FormCreateReminder = Pick<IReminder, "reminded" | "taskID">;
