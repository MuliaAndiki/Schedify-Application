"use client";

import { useState } from "react";

import SettingsProfilePartial from "@/components/partial/private/settings-profile";
import SettingsSecurityPartial from "@/components/partial/private/settings-security";
import SettingsAll from "@/components/partial/private/settingsAll";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormUpdateProfile } from "@/types/form/auth.form";
import { IAuth } from "@/types/schema";

interface SettingsProps {
  userData: IAuth;
  onLogout: () => void;
  isPending: boolean;
  isEditingProfile: boolean;
  onEditingProfile: (editing: boolean) => void;
  onUpdateProfile: (payload: FormUpdateProfile) => void;
  isUpdatingProfile: boolean;
}

const SettingsHeroSection: React.FC<SettingsProps> = ({
  userData,
  onLogout,
  isPending,
  isEditingProfile,
  onEditingProfile,
  onUpdateProfile,
  isUpdatingProfile,
}) => {
  return (
    <view className="w-full h-full overflow-x-hidden relative">
      <div className="w-full flex justify-start items-center flex-col h-full gap-6 p-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground text-sm">
            Kelola akun dan preferensi Anda
          </p>
        </div>

        <SettingsProfilePartial
          userData={userData}
          isEditing={isEditingProfile}
          onEdit={onEditingProfile}
          onUpdate={onUpdateProfile}
          isUpdating={isUpdatingProfile}
        />

        <SettingsSecurityPartial />
        <SettingsAll />

        <Card className="w-full border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Zona Berbahaya</CardTitle>
            <CardDescription>
              Tindakan yang tidak dapat diurungkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={isPending}
              type="button"
              variant="destructive"
              onClick={() => onLogout()}
            >
              {isPending ? "Tunggu..." : "Logout"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </view>
  );
};

export default SettingsHeroSection;
