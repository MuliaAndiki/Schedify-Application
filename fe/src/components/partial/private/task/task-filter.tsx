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

interface TaskFilterPartialProps {
  categories: ICategory[];
  selectedCategoryId: string;
  filterStatus: "all" | "done";
  onCategoryChange: (categoryId: string) => void;
  onFilterChange: (status: "all" | "done") => void;
}

const TaskFilterPartial: React.FC<TaskFilterPartialProps> = ({
  categories,
  selectedCategoryId,
  filterStatus,
  onCategoryChange,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-3 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <Select value={selectedCategoryId} onValueChange={onCategoryChange}>
          <SelectTrigger>
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

      <div className="flex gap-2">
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          Semua
        </Button>
        {/* <Button
          variant={filterStatus === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("pending")}
        >
          Pending
        </Button> */}
        <Button
          variant={filterStatus === "done" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("done")}
        >
          Selesai
        </Button>
      </div>
    </div>
  );
};

export default TaskFilterPartial;
