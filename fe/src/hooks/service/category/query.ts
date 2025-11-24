import { useQuery } from "@tanstack/react-query";

import Api from "@/services/props.service";

export function useCategoryData(id?: string) {
  const useCategoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: () => Api.Category.get(),
    staleTime: 1000 * 60 * 5,
  });
  const useCategoryQueryID = useQuery({
    queryKey: ["category", id],
    queryFn: () => Api.Category.getByID(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
  return {
    CategoryQuery: useCategoryQuery.data?.data ?? [],
    CategoryQueryID: useCategoryQueryID.data?.data ?? "",
    isLoading: useCategoryQuery.isLoading || useCategoryQueryID.isLoading,
    isError: useCategoryQuery.isLoading || useCategoryQueryID.isError,
    refectAll: () => {
      useCategoryQuery.refetch();
      useCategoryQueryID.refetch();
    },
  };
}
