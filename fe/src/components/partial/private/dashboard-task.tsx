"use client";

import { ITask, ICategory } from "@/types/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface DashboardTaskPartialProps {
  tasks: ITask[];
  categories: ICategory[];
  isLoading: boolean;
}

const DashboardTaskPartial: React.FC<DashboardTaskPartialProps> = ({
  tasks,
  categories,
  isLoading,
}) => {
  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.title || "Unknown";
  };

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd MMM yyyy", { locale: idLocale });
    } catch {
      return date;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Tugas Terbaru</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Tugas Terbaru</h2>
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">Belum ada tugas</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Tugas Terbaru</h2>
        <Link href="/task" className="text-sm text-primary hover:underline">
          Lihat Semua
        </Link>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Checkbox checked={task.isDone} disabled className="mt-1" />
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      task.isDone ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.todo}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {getCategoryName(task.categoryID)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(task.startAt)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardTaskPartial;
