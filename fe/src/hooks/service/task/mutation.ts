import { useMutation } from "@tanstack/react-query";

import { useAppNameSpase } from "@/hooks/useNameSpace";
import { TResponse } from "@/pkg/react-query/mutation-wrapper.type";
import Api from "@/services/props.service";
import { FormCreateTask } from "@/types/form/task.form";

const TaskMutation = {
  useCreate() {
    const namespace = useAppNameSpase();
    return useMutation<
      TResponse<any>,
      Error,
      { payload: FormCreateTask; id: string }
    >({
      mutationFn: ({ id, payload }) => Api.Task.createTask(payload, id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "task",
        });
        namespace.alert.toast({
          title: "succesfuly",
          message: "succesfully create Task",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed create Task",
          icon: "error",
        });
      },
    });
  },
  useDelete() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: () => Api.Task.deleteTask(),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "task",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully delete task",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed delete task",
          icon: "error",
        });
      },
    });
  },
  useDeleteByID() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, { id: string }>({
      mutationFn: ({ id }) => Api.Task.deleteTaskById(id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "task",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully delete by id",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed delete by id",
          icon: "error",
        });
      },
    });
  },
  useUpdate() {
    const namespace = useAppNameSpase();
    return useMutation<
      TResponse<any>,
      Error,
      { payload: FormCreateTask; id: string }
    >({
      mutationFn: ({ id, payload }) => Api.Task.updateTask(payload, id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "task",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully update task",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed update task",
          icon: "error",
        });
      },
    });
  },
  useDoneTask() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, string>({
      mutationFn: (id) => Api.Task.doneTask(id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "task",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully done task",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed done task data",
          icon: "error",
        });
      },
    });
  },
};

export default TaskMutation;
