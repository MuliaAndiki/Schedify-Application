import { Edit2 } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PopUp from "@/components/ui/pop-up";
import { FormUpdateProfile } from "@/types/form/auth.form";
import { IAuth } from "@/types/schema";
import { PopUpInterface } from "@/types/ui";

import EditProfileForm from "./_form/edit-profile";

interface SettingsProfilePartialProps {
  userData: IAuth;
  onUpdate: () => void;
  handlePopUp: (data: any) => void;
  isPending: boolean;
  onChangePitch: (e: any) => void;
  popUpModal: PopUpInterface;
  formUpdateProfile: FormUpdateProfile;
  setFormUpdateProfile: React.Dispatch<React.SetStateAction<FormUpdateProfile>>;
  preview: string | null;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopUpInterface>>;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const SettingsProfilePartial: React.FC<SettingsProfilePartialProps> = ({
  userData,

  onUpdate,
  isPending,
  onChangePitch,
  formUpdateProfile,
  setFormUpdateProfile,
  preview,
  handlePopUp,
  setPopUpModal,
  popUpModal,
  setPreview,
}) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profil Saya</CardTitle>
          <CardDescription>Kelola informasi profil Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Image
              alt="avatar"
              src={userData?.photoUrl ? userData.photoUrl : "/avatars/1.png"}
              width={100}
              height={100}
              className="object-cover aspect-square rounded-lg"
            />
            <div className="w-full">
              <p className="text-sm font-medium">{userData?.fullName}</p>
              <p className="text-sm text-muted-foreground">{userData?.email}</p>
            </div>
          </div>
          <div className="w-full mt-2">
            <Button
              variant={"outline"}
              className="w-full flex"
              onClick={() => handlePopUp(userData)}
            >
              <Edit2 />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <PopUp
        isOpen={popUpModal === "edit-profile"}
        onClose={() => setPopUpModal(null)}
      >
        <EditProfileForm
          formUpdateProfile={formUpdateProfile}
          isPending={isPending}
          onChangePitch={onChangePitch}
          onUpdate={onUpdate}
          preview={preview}
          setFormUpdateProfile={setFormUpdateProfile}
          setPopUpModal={setPopUpModal}
          setPreview={setPreview}
        />
      </PopUp>
    </>
  );
};

export default SettingsProfilePartial;
