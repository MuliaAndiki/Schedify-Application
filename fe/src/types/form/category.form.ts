import { ICategory } from "../schema";

export type PickCategoryID = Pick<ICategory, "id">;
export type FormCreateCategory = Pick<ICategory, "title" | "description">;
