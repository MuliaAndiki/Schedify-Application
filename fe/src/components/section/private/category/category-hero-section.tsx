"use client";

import { useState } from "react";
import { ICategory } from "@/types/schema";
import { FormCreateCategory } from "@/types/form/category.form";
import CategoryListPartial from "@/components/partial/private/category/category-list";
import CategoryModalPartial from "@/components/partial/private/category/category-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoryHeroSectionProps {
  categories: ICategory[];
  isLoading: boolean;
  isOpen: boolean;
  editingId: string | null;
  onOpenModal: (id?: string) => void;
  onCloseModal: () => void;
  onCreate: (payload: FormCreateCategory) => void;
  onUpdate: (payload: FormCreateCategory) => void;
  onDelete: (id: string) => void;
  isPendingCreate: boolean;
  isPendingUpdate: boolean;
  isPendingDelete: boolean;
}

const CategoryHeroSection: React.FC<CategoryHeroSectionProps> = ({
  categories,
  isLoading,
  isOpen,
  editingId,
  onOpenModal,
  onCloseModal,
  onCreate,
  onUpdate,
  onDelete,
  isPendingCreate,
  isPendingUpdate,
  isPendingDelete,
}) => {
  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <div className="w-full flex flex-col gap-6 p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Kategori</h1>
            <p className="text-muted-foreground text-sm">
              Kelola kategori tugas Anda
            </p>
          </div>
          <Button onClick={() => onOpenModal()} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah
          </Button>
        </div>

        {/* List */}
        <CategoryListPartial
          categories={categories}
          isLoading={isLoading}
          onEdit={onOpenModal}
          onDelete={onDelete}
          isPendingDelete={isPendingDelete}
        />
      </div>

      {/* Modal */}
      <CategoryModalPartial
        isOpen={isOpen}
        onClose={onCloseModal}
        editingId={editingId}
        categories={categories}
        onCreate={onCreate}
        onUpdate={onUpdate}
        isPending={isPendingCreate || isPendingUpdate}
      />
    </div>
  );
};

export default CategoryHeroSection;
