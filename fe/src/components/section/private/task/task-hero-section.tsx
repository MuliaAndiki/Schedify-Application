"use client";

import { useState } from "react";
import { ITask, ICategory } from "@/types/schema";
import { FormCreateTask } from "@/types/form/task.form";
import TaskListPartial from "@/components/partial/private/task/task-list";
import TaskModalPartial from "@/components/partial/private/task/task-modal";
import TaskFilterPartial from "@/components/partial/private/task/task-filter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskHeroSectionProps {
  tasks: ITask[];
  categories: ICategory[];
  isLoading: boolean;
  isOpen: boolean;
  editingId: string | null;
  selectedCategoryId: string;
  onOpenModal: (id?: string, categoryId?: string) => void;
  onCloseModal: () => void;
  onCreate: (payload: FormCreateTask) => void;
  onUpdate: (payload: FormCreateTask) => void;
  onDelete: (id: string) => void;
  onCategoryChange: (categoryId: string) => void;
  isPendingCreate: boolean;
  isPendingUpdate: boolean;
  isPendingDelete: boolean;
  onDone: (id: string) => void;
  filterStatus: "all" | "done" | "pending";
  setFilterStatus: React.Dispatch<
    React.SetStateAction<"all" | "done" | "pending">
  >;
}

const TaskHeroSection: React.FC<TaskHeroSectionProps> = ({
  tasks,
  categories,
  isLoading,
  isOpen,
  editingId,
  selectedCategoryId,
  onOpenModal,
  onCloseModal,
  onCreate,
  onUpdate,
  onDelete,
  onCategoryChange,
  isPendingCreate,
  isPendingUpdate,
  isPendingDelete,
  onDone,
  filterStatus,
  setFilterStatus,
}) => {
  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      selectedCategoryId === "all" || task.category.id === selectedCategoryId;

    let statusMatch = true;
    if (filterStatus === "done") statusMatch = task.isDone === true;
    if (filterStatus === "pending") statusMatch = task.isDone === false;

    return categoryMatch && statusMatch;
  });
  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <div className="w-full flex flex-col gap-6 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tugas</h1>
            <p className="text-muted-foreground text-sm">
              Kelola tugas dan aktivitas Anda
            </p>
          </div>
          <Button onClick={() => onOpenModal()} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah
          </Button>
        </div>

        <TaskFilterPartial
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          filterStatus={filterStatus}
          onCategoryChange={onCategoryChange}
          setFilterStatus={setFilterStatus}
        />

        <TaskListPartial
          tasks={filteredTasks}
          onDone={onDone}
          isLoading={isLoading}
          onEdit={onOpenModal}
          onDelete={onDelete}
          isPendingDelete={isPendingDelete}
        />
      </div>

      <TaskModalPartial
        isOpen={isOpen}
        onClose={onCloseModal}
        editingId={editingId}
        tasks={tasks}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onCategoryChange={onCategoryChange}
        isPending={isPendingCreate || isPendingUpdate}
      />
    </div>
  );
};

export default TaskHeroSection;
