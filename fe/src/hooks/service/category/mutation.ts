import { useMutation } from "@tanstack/react-query";

import { useAppNameSpase } from "@/hooks/useNameSpace";
import { TResponse } from "@/pkg/react-query/mutation-wrapper.type";
import Api from "@/services/props.service";
import { FormCreateCategory } from "@/types/form/category.form";

const CategoryMutation = {
  useCreate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateCategory>({
      mutationFn: (payload) => Api.Category.create(payload),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "category",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully, create Category",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed create category",
          icon: "error",
        });
      },
    });
  },
  useDeleteAll() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, any>({
      mutationFn: () => Api.Category.delete(),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "category",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully delete Category",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed delete Category",
          icon: "error",
        });
      },
    });
  },
  useDeleteById() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, string>({
      mutationFn: (id) => Api.Category.deleteById(id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "category",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully delete category by id",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed delete category by id",
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
      { payload: FormCreateCategory; id: string }
    >({
      mutationFn: ({ id, payload }) => Api.Category.update(payload, id),
      onSuccess: () => {
        namespace.queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "category",
        });
        namespace.alert.toast({
          title: "succesfully",
          message: "succesfully update category",
          icon: "success",
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: "failed",
          message: "failed update category",
          icon: "error",
        });
      },
    });
  },
};

export default CategoryMutation;
