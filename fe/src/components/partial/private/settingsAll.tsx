"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ThemeToggle from "@/core/components/theme-toggle";

const SettingsAll: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Default</CardTitle>
        <CardDescription>Kelola Applikasi Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">Tema</p>
            <p className="text-sm text-muted-foreground">
              Atur Tema Anda Dengan Sesuka Hati
            </p>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsAll;
