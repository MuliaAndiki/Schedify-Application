"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SettingsSecurityPartial: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Keamanan</CardTitle>
        <CardDescription>Kelola keamanan akun Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">Password</p>
            <p className="text-sm text-muted-foreground">
              Ubah password Anda secara berkala
            </p>
          </div>
          <Link href={"/forgot-password"}>
            <Button variant="outline" size="sm">
              Ubah Password
            </Button>
          </Link>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">Verifikasi Email</p>
            <p className="text-sm text-muted-foreground">
              Pastikan email Anda terverifikasi
            </p>
          </div>
          <Button variant="outline" size="sm" disabled>
            Terverifikasi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsSecurityPartial;
