"use client";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import RegisterHeroSection from "@/components/section/auth/register-hero-section";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormRegister } from "@/types/form/auth.form";
const RegisterContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: "",
    fullName: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const register = service.Auth.mutation.useRegister();
  const handleRegister = () => {
    if (
      !formRegister.email ||
      !formRegister.fullName ||
      !formRegister.password
    ) {
      namespace.alert.toast({
        title: "warning",
        message: "colum is not to be empty",
        icon: "warning",
      });
    } else if (confirmPassword !== formRegister.password) {
      namespace.alert.toast({
        title: "warning",
        message: "colum password & confirm password not martch",
        icon: "warning",
      });
    } else {
      register.mutate(formRegister, {
        onSuccess: () => {
          namespace.router.push("/verify-otp");
        },
      });
    }
  };

  return (
    <main className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Schedify Inc.
        </Link>
        <RegisterHeroSection
          confirmPassword={confirmPassword}
          formRegister={formRegister}
          isPending={register.isPending}
          onRegister={() => handleRegister()}
          setConfirmPassword={setConfirmPassword}
          setFormRegister={setFormRegister}
        />
      </div>
    </main>
  );
};

export default RegisterContainer;
