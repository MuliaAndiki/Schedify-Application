import { useMutation } from "@tanstack/react-query";

import { useAppNameSpase } from "@/hooks/useNameSpace";
import { TResponse } from "@/pkg/react-query/mutation-wrapper.type";
import Api from "@/services/props.service";
import { FormCreateReminder } from "@/types/form/reminded.form";

const RemindedMutation = {
  useCreate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateReminder>({
      mutationFn: (payload) => Api.Reminded.create(payload),
      onSuccess: () => {
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully create reminded",
          icon: "success",
        });
      },
      onError: () => {
        namespace.alert.toast({
          title: "failed",
          message: "failed create reminded",
          icon: "error",
        });
      },
    });
  },
  useDeleteById() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, string>({
      mutationFn: (id) => Api.Reminded.deleteById(id),
      onSuccess: () => {
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully delete reminded",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed delete reminded",
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
      { payload: FormCreateReminder; id: string }
    >({
      mutationFn: ({ id, payload }) => Api.Reminded.update(payload, id),
      onSuccess: () => {
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully update reminded",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed update reminded",
          icon: "error",
        });
      },
    });
  },
  useDeleteAll() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: () => Api.Reminded.delete(),
      onSuccess: () => {
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully delete all reminded",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed delete all reminded",
          icon: "error",
        });
      },
    });
  },
};

export default RemindedMutation;
