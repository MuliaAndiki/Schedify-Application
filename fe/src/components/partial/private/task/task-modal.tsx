"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormCreateTask } from "@/types/form/task.form";
import { ICategory,ITask } from "@/types/schema";

interface TaskModalPartialProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: string | null;
  tasks: ITask[];
  categories: ICategory[];
  selectedCategoryId: string;
  onCreate: (payload: FormCreateTask) => void;
  onUpdate: (payload: FormCreateTask) => void;
  onCategoryChange: (categoryId: string) => void;
  isPending: boolean;
}

const TaskModalPartial: React.FC<TaskModalPartialProps> = ({
  isOpen,
  onClose,
  editingId,
  tasks,
  categories,
  selectedCategoryId,
  onCreate,
  onUpdate,
  onCategoryChange,
  isPending,
}) => {
  const [form, setForm] = useState<FormCreateTask>({
    todo: "",
    endAt: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (editingId) {
      const task = tasks.find((t) => t.id === editingId);
      if (task) {
        setForm({
          todo: task.todo,

          endAt: task.createdAt,
        });
      }
    } else {
      setForm({
        todo: "",
        endAt: new Date().toISOString().split("T")[0],
      });
    }
  }, [editingId, isOpen, tasks]);

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
      <DialogContent className="w-full max-w-md ">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Tugas" : "Tambah Tugas Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <FieldLabel>Kategori</FieldLabel>
            <Select value={selectedCategoryId} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>Pilih kategori untuk tugas ini</FieldDescription>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Deskripsi Tugas</FieldLabel>
            <Textarea
              placeholder="Apa yang perlu Anda lakukan?"
              value={form.todo}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setForm({ ...form, todo: e.target.value })
              }
              required
              rows={4}
            />
            <FieldDescription>
              Jelaskan tugas yang perlu diselesaikan
            </FieldDescription>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Tanggal berakhir</FieldLabel>
            <Input
              type="date"
              value={form.endAt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, endAt: e.target.value })
              }
              required
            />
            <FieldDescription>Kapan tugas ini berakhir?</FieldDescription>
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

export default TaskModalPartial;
