"use client";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { IReminder, ITask } from "@/types/schema";
import { getDate } from "@/utils/string.format";

interface DashboardTaskPartialProps {
  tasks: ITask[];
  isLoading: boolean;
  onDone: (id: string) => void;
  remended: IReminder[];
}

const DashboardTaskPartial: React.FC<DashboardTaskPartialProps> = ({
  tasks,
  isLoading,
  onDone,
  remended,
}) => {
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
                <Checkbox
                  onClick={() => onDone(task.id)}
                  checked={task.isDone}
                  className="mt-1"
                />
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
                      {task.category.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(task.endAt)}
                    </span>
                  </div>
                </div>
              </div>
              {remended.map((items) => (
                <div key={items.id}>
                  <h1 className="font-medium">
                    Remend: {getDate(items.reminded)}
                  </h1>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardTaskPartial;
