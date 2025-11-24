"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/schema";
import { AlertContexType } from "@/types/ui";

interface TaskFilterPartialProps {
  alert: AlertContexType;
  categories: ICategory[];
  selectedCategoryId: string;
  filterStatus: "all" | "done" | "pending";
  setFilterStatus: React.Dispatch<
    React.SetStateAction<"all" | "done" | "pending">
  >;
  onCategoryChange: (categoryId: string) => void;
  onDeleteAll: () => void;
  deleteAllIspending: boolean;
}

const TaskFilterPartial: React.FC<TaskFilterPartialProps> = ({
  categories,
  selectedCategoryId,
  filterStatus,
  onCategoryChange,
  setFilterStatus,
  onDeleteAll,
  deleteAllIspending,
  alert,
}) => {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex-1 min-w-full">
        <Select
          value={selectedCategoryId || "all"}
          onValueChange={(value) => onCategoryChange(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih kategori..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 w-full">
        <div className="w-full flex justify-between items-center gap-4">
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "done" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("done")}
            >
              Selesai
            </Button>
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              Semua
            </Button>
          </div>
          <div className="w-full">
            <Button
              variant={"destructive"}
              className="w-full"
              disabled={deleteAllIspending}
              onClick={() =>
                alert.confirm({
                  title: "perhatian",
                  deskripsi: "Apakah Kamu Yakin Menghapush semua?",
                  icon: "question",
                  onConfirm: () => {
                    onDeleteAll();
                  },
                  onClose: () => {},
                })
              }
            >
              {deleteAllIspending ? "wait" : "Delete All"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilterPartial;
