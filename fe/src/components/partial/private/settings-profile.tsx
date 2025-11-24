"use client";

import { useEffect, useState } from "react";
import { IAuth } from "@/types/schema";
import { FormUpdateProfile } from "@/types/form/auth.form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Edit2 } from "lucide-react";

interface SettingsProfilePartialProps {
  userData: IAuth;
  isEditing: boolean;
  onEdit: (editing: boolean) => void;
  onUpdate: (payload: FormUpdateProfile) => void;
  isUpdating: boolean;
}

const SettingsProfilePartial: React.FC<SettingsProfilePartialProps> = ({
  userData,
  isEditing,
  onEdit,
  onUpdate,
  isUpdating,
}) => {
  const [form, setForm] = useState<FormUpdateProfile>({
    fullName: "",
    email: "",
    photoUrl: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        fullName: userData.fullName,
        email: userData.email,
        photoUrl: userData.photoUrl,
      });
    }
  }, [userData, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profil Saya</CardTitle>
          <CardDescription>Kelola informasi profil Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex flex-col gap-3 flex-1">
              <Image
                alt="avatar"
                src={userData?.photoUrl ? userData.photoUrl : "/avatars/1.jpeg"}
                width={100}
                height={100}
                className="object-cover aspect-square rounded-lg"
              />
              <p className="text-sm font-medium">{userData?.fullName}</p>
              <p className="text-sm text-muted-foreground">{userData?.email}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => onEdit(true)}
              className="h-fit"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={onEdit}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profil</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <FieldLabel>Nama Lengkap</FieldLabel>
              <Input
                placeholder="Masukkan nama lengkap Anda"
                value={form.fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                required
              />
              <FieldDescription>Nama yang akan ditampilkan</FieldDescription>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="Email Anda"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
              <FieldDescription>Alamat email Anda</FieldDescription>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>URL Foto Profil</FieldLabel>
              <Input
                placeholder="https://example.com/avatar.jpg"
                value={form.photoUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, photoUrl: e.target.value })
                }
              />
              <FieldDescription>URL gambar profil Anda</FieldDescription>
            </FieldGroup>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onEdit(false)}
                disabled={isUpdating}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsProfilePartial;
