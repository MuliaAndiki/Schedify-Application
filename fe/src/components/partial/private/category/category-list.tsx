import { Edit2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ICategory } from "@/types/schema";

interface CategoryListPartialProps {
  categories: ICategory[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isPendingDelete: boolean;
}

const CategoryListPartial: React.FC<CategoryListPartialProps> = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
  isPendingDelete,
}) => {
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

  if (!categories || categories.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              Belum ada kategori, buat kategori baru untuk memulai
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {categories.map((category) => (
        <Card key={category.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <CardDescription className="mt-2">
                  {category.description}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(category.id)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(category.id)}
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

export default CategoryListPartial;
