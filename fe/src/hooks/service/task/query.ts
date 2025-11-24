import { useQuery } from "@tanstack/react-query";

import Api from "@/services/props.service";

export function useTaskData(id?: string) {
  const TaskQuery = useQuery({
    queryKey: ["task"],
    queryFn: () => Api.Task.getTask(),
    staleTime: 1000 * 60 * 5,
  });
  const TaskQueryId = useQuery({
    queryKey: ["task", id],
    queryFn: () => Api.Task.getTaskById(id!),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
  return {
    TaskQuery: TaskQuery.data?.data ?? [],
    TaskQueryId: TaskQuery.data?.data ?? "",
    isLoading: TaskQuery.isLoading || TaskQueryId.isLoading,
    isError: TaskQuery.isError || TaskQueryId.isError,
    refectAll: () => {
      TaskQuery.refetch();
      TaskQueryId.refetch();
    },
  };
}
