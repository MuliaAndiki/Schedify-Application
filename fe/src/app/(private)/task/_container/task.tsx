"use client";

import { useCallback, useState } from "react";

import TaskHeroSection from "@/components/section/private/task/task-hero-section";
import { SidebarLayout } from "@/core/layouts/sidebar.layout";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormCreateTask } from "@/types/form/task.form";

const TaskContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const taskQuery = service.Task.query();
  const categoryQuery = service.Category.query();
  const createMutation = service.Task.mutation.useCreate();
  const updateMutation = service.Task.mutation.useUpdate();
  const deleteMutation = service.Task.mutation.useDeleteByID();
  const doneMutation = service.Task.mutation.useDoneTask();
  const [filterStatus, setFilterStatus] = useState<"all" | "done" | "pending">(
    "all"
  );

  const handleCreate = (payload: FormCreateTask) => {
    if (!payload.todo || !payload.endAt) {
      namespace.alert.toast({
        title: "Warning",
        message: "Todo dan kategori harus dipilih",
        icon: "warning",
      });
      return;
    }

    createMutation.mutate(
      { payload, id: selectedCategoryId },
      {
        onSuccess: () => {
          setIsOpen(false);
          setSelectedCategoryId("");
        },
      }
    );
  };

  const handleUpdate = (payload: FormCreateTask) => {
    if (!editingId) return;

    updateMutation.mutate(
      { payload, id: editingId },
      {
        onSuccess: () => {
          setIsOpen(false);
          setEditingId(null);
        },
      }
    );
  };

  const handleDelete = useCallback((id: string) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {},
      }
    );
  }, []);

  const handleOpenModal = (id?: string, categoryId?: string) => {
    if (id) {
      setEditingId(id);
    }
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setSelectedCategoryId("");
  };

  const handleDone = (id?: string) => {
    return doneMutation.mutate(id!);
  };

  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col">
        <TaskHeroSection
          tasks={taskQuery.TaskQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          categories={categoryQuery.CategoryQuery}
          isLoading={taskQuery.isLoading}
          isOpen={isOpen}
          editingId={editingId}
          selectedCategoryId={selectedCategoryId}
          onOpenModal={handleOpenModal}
          onCloseModal={handleCloseModal}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCategoryChange={setSelectedCategoryId}
          onDone={handleDone}
          isPendingCreate={createMutation.isPending}
          isPendingUpdate={updateMutation.isPending}
          isPendingDelete={deleteMutation.isPending}
        />
      </main>
    </SidebarLayout>
  );
};

export default TaskContainer;
