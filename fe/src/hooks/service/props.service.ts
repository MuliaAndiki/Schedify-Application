import AuthMutation from "./auth/mutation";
import { useAuthData } from "./auth/query";
import CategoryMutation from "./category/mutation";
import { useCategoryData } from "./category/query";
import RemindedMutation from "./reminded/mutation";
import { useRemindedData } from "./reminded/query";
import TaskMutation from "./task/mutation";
import { useTaskData } from "./task/query";

export const useService = () => ({
  Auth: {
    mutation: AuthMutation,
    query: useAuthData,
  },
  Category: {
    mutation: CategoryMutation,
    query: useCategoryData,
  },
  Task: {
    mutation: TaskMutation,
    query: useTaskData,
  },
  reminded: {
    mutation: RemindedMutation,
    query: useRemindedData,
  },
});
export default useService;
