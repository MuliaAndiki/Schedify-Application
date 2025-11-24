"use client";
import { useState } from "react";

import SettingsHeroSection from "@/components/section/private/settings-hero-section";
import { SidebarLayout } from "@/core/layouts/sidebar.layout";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormUpdateProfile } from "@/types/form/auth.form";

const SettingsContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const logout = service.Auth.mutation.useLogout();
  const updateProfile = service.Auth.mutation.useUpdateProfile();
  const authData = service.Auth.query();

  const handleLogout = () => {
    return logout.mutate(
      {},
      {
        onSuccess: () => {
          namespace.router.push("/home");
        },
      }
    );
  };

  const handleUpdateProfile = (payload: FormUpdateProfile) => {
    updateProfile.mutate(payload, {
      onSuccess: () => {
        setIsEditingProfile(false);
        authData.refetchAll();
      },
    });
  };

  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col">
        <SettingsHeroSection
          userData={authData.profileQuery ?? ""}
          isPending={logout.isPending}
          isEditingProfile={isEditingProfile}
          onEditingProfile={setIsEditingProfile}
          onLogout={() => handleLogout()}
          onUpdateProfile={handleUpdateProfile}
          isUpdatingProfile={updateProfile.isPending}
        />
      </main>
    </SidebarLayout>
  );
};

export default SettingsContainer;
