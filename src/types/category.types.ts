export interface ICategory {
  id: string;
  title: string;
  userId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type JwtCategoryPayload = Pick<
  ICategory,
  "id" | "description" | "title" | "createdAt" | "updatedAt" | "userId"
>;
export type PickCreateCategory = Pick<ICategory, "title" | "description">;
export type PickCategoryID = Pick<ICategory, "id">;
