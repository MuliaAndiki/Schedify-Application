"use client";

import { ImageDownIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormUpdateProfile } from "@/types/form/auth.form";
import { PopUpInterface } from "@/types/ui";
import UploadsTrigger from "@/utils/uploadtrigger";

interface EditProfileFormProps {
  onUpdate: () => void;
  formUpdateProfile: FormUpdateProfile;
  setFormUpdateProfile: React.Dispatch<React.SetStateAction<FormUpdateProfile>>;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  onChangePitch: (e: any) => void;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopUpInterface>>;
  isPending: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  onUpdate,
  formUpdateProfile,
  setFormUpdateProfile,
  preview,
  setPreview,
  onChangePitch,
  setPopUpModal,
  isPending,
}) => {
  return (
    <view>
      <div className="w-full max-w-sm">
        <div>
          <h1>Edit Profil</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate();
          }}
          className="space-y-6"
        >
          <FieldGroup>
            <FieldLabel>Nama Lengkap</FieldLabel>
            <Input
              placeholder="Masukkan nama lengkap Anda"
              value={formUpdateProfile.fullName}
              onChange={(e) =>
                setFormUpdateProfile((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
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
              value={formUpdateProfile.email}
              onChange={(e) =>
                setFormUpdateProfile((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
            <FieldDescription>Alamat email Anda</FieldDescription>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>URL Foto Profil</FieldLabel>
            <UploadsTrigger
              accept="image/*"
              multiple={false}
              onChange={onChangePitch}
            >
              <Button
                className="w-full  border h-40"
                type="button"
                variant={"ghost"}
              >
                <ImageDownIcon size={100} />
                Uploads Photo
              </Button>
            </UploadsTrigger>
            {preview && (
              <div className="w-full flex justify-center">
                <Image
                  alt="pitch"
                  src={preview ? preview : "/avatars/8.png"}
                  width={150}
                  height={150}
                  className="object-cover aspect-square rounded-full"
                />
              </div>
            )}
          </FieldGroup>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPopUpModal(null)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </view>
  );
};

export default EditProfileForm;
