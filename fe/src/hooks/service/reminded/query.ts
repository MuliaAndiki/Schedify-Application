import { useQuery } from "@tanstack/react-query";

import Api from "@/services/props.service";

export function useRemindedData(id?: string) {
  const useRemindedQuery = useQuery({
    queryKey: ["reminded"],
    queryFn: () => Api.Reminded.get(),
    staleTime: 1000 * 60 * 5,
  });
  return {
    useRemindedQuery: useRemindedQuery.data?.data ?? [],
    isLoading: useRemindedQuery.isLoading,
    isError: useRemindedQuery.isError,
    refect: () => {
      useRemindedQuery.refetch();
    },
  };
}
