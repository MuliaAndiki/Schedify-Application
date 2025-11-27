"use client";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar, Edit2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { ITask } from "@/types/schema";

interface TaskListPartialProps {
  tasks: ITask[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isPendingDelete: boolean;
  onDone: (id: string) => void;
}

const TaskListPartial: React.FC<TaskListPartialProps> = ({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  isPendingDelete,
  onDone,
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
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              Belum ada tugas, buat tugas baru untuk memulai
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`hover:shadow-md transition-all ${
            task.isDone ? "opacity-60" : ""
          }`}
        >
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-3 flex-1">
                <Checkbox
                  onClick={() => onDone(task.id)}
                  checked={task.isDone}
                  className="mt-1"
                />
                <div className="flex-1">
                  <CardTitle
                    className={`text-base ${
                      task.isDone ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.todo}
                  </CardTitle>
                  <CardDescription className="mt-2 flex items-center gap-2">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {task.category.title}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(task.endAt)}
                    </span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(task.id)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  disabled={isPendingDelete}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default TaskListPartial;
