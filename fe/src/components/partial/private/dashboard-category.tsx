"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ICategory } from "@/types/schema";

interface DashboardCategoryPartialProps {
  categories: ICategory[];
  isLoading: boolean;
}

const DashboardCategoryPartial: React.FC<DashboardCategoryPartialProps> = ({
  categories,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Kategori Terbaru</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-3">Kategori Terbaru</h2>
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">Belum ada kategori</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Kategori Terbaru</h2>
        <Link href="/category" className="text-sm text-primary hover:underline">
          Lihat Semua
        </Link>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-sm">{category.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCategoryPartial;
