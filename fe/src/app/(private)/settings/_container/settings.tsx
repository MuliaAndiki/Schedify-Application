"use client";
import { useState } from "react";

import SettingsHeroSection from "@/components/section/private/settings-hero-section";
import { SidebarLayout } from "@/core/layouts/sidebar.layout";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormUpdateProfile } from "@/types/form/auth.form";
import { PopUpInterface } from "@/types/ui";
import { fileToBase64 } from "@/utils/base64";

const SettingsContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();

  const logout = service.Auth.mutation.useLogout();
  const updateProfile = service.Auth.mutation.useUpdateProfile();
  const authData = service.Auth.query();
  const [popUpModal, setPopUpModal] = useState<PopUpInterface>(null);
  const [formUpdateProfile, setFormUpdateProfile] = useState<FormUpdateProfile>(
    {
      email: "",
      fullName: "",
      photoUrl: "",
    }
  );
  const [preview, setPreview] = useState<string | null>(null);

  const handleChangePitch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFormUpdateProfile((prev) => ({
        ...prev,
        photoUrl: base64,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleOpenPopUp = (data: any) => {
    setFormUpdateProfile(data);
    setPopUpModal("edit-profile");
  };

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

  const handleUpdate = () => {
    updateProfile.mutate(formUpdateProfile, {
      onSuccess: () => {
        setPopUpModal(null);
      },
    });
  };

  return (
    <SidebarLayout>
      <main className="w-full min-h-screen flex flex-col">
        <SettingsHeroSection
          userData={authData.profileQuery ?? ""}
          isPending={logout.isPending}
          formUpdateProfile={formUpdateProfile}
          setFormUpdateProfile={setFormUpdateProfile}
          priview={preview}
          onLogout={() => handleLogout()}
          onUpdateProfile={handleUpdate}
          onChangePitch={handleChangePitch}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
          setPriview={setPreview}
          handleOpenPopUp={handleOpenPopUp}
        />
      </main>
    </SidebarLayout>
  );
};

export default SettingsContainer;
