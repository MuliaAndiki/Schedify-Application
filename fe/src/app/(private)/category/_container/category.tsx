"use client";

import { useCallback, useState } from "react";
import { SidebarLayout } from "@/core/layouts/sidebar.layout";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import CategoryHeroSection from "@/components/section/private/category/category-hero-section";
import { FormCreateCategory } from "@/types/form/category.form";
import { PickCategoryID } from "@/types/form/category.form";

const CategoryContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categoryQuery = service.Category.query();
  const createMutation = service.Category.mutation.useCreate();
  const updateMutation = service.Category.mutation.useUpdate();
  const deleteMutation = service.Category.mutation.useDeleteById();

  const handleCreate = (payload: FormCreateCategory) => {
    if (!payload.title || !payload.description) {
      namespace.alert.toast({
        title: "Warning",
        message: "Title dan description harus diisi",
        icon: "warning",
      });
      return;
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  const handleUpdate = (payload: FormCreateCategory) => {
    if (!editingId) return;

    updateMutation.mutate(
      { payload, id: editingId },
      {
        onSuccess: () => {
          setIsOpen(false);
          setEditingId(null);
          namespace.queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "category",
          });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleOpenModal = (id?: string) => {
    if (id) {
      setEditingId(id);
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingId(null);
  };

  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col">
        <CategoryHeroSection
          categories={categoryQuery.CategoryQuery}
          isLoading={categoryQuery.isLoading}
          isOpen={isOpen}
          editingId={editingId}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isPendingCreate={createMutation.isPending}
          isPendingUpdate={updateMutation.isPending}
          isPendingDelete={deleteMutation.isPending}
        />
      </main>
    </SidebarLayout>
  );
};

export default CategoryContainer;
