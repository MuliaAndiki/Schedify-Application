"use client";

import { useEffect, useState } from "react";
import { ICategory } from "@/types/schema";
import { FormCreateCategory } from "@/types/form/category.form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CategoryModalPartialProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: string | null;
  categories: ICategory[];
  onCreate: (payload: FormCreateCategory) => void;
  onUpdate: (payload: FormCreateCategory) => void;
  isPending: boolean;
}

const CategoryModalPartial: React.FC<CategoryModalPartialProps> = ({
  isOpen,
  onClose,
  editingId,
  categories,
  onCreate,
  onUpdate,
  isPending,
}) => {
  const [form, setForm] = useState<FormCreateCategory>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (editingId) {
      const category = categories.find((c) => c.id === editingId);
      if (category) {
        setForm({
          title: category.title,
          description: category.description,
        });
      }
    } else {
      setForm({ title: "", description: "" });
    }
  }, [editingId, isOpen, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(form);
    } else {
      onCreate(form);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Kategori" : "Tambah Kategori Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <FieldLabel>Nama Kategori</FieldLabel>
            <Input
              placeholder="Contoh: Pekerjaan, Personal, dst"
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
            <FieldDescription>
              Masukkan nama kategori yang unik
            </FieldDescription>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Deskripsi</FieldLabel>
            <Textarea
              placeholder="Deskripsikan kategori ini..."
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={4}
            />
            <FieldDescription>
              Tambahkan deskripsi untuk kategori ini
            </FieldDescription>
          </FieldGroup>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : editingId ? "Perbarui" : "Tambah"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModalPartial;
