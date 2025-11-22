import AuthMutation from "./auth/mutation";
import { useAuthData } from "./auth/query";

export const useService = () => ({
  Auth: {
    mutation: AuthMutation,
    query: useAuthData,
  },
});
export default useService;
