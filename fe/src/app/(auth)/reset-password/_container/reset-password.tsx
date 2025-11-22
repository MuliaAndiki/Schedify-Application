"use client";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import ResetPasswordHeroSection from "@/components/section/auth/reset-password-hero-section";
import { useAppSelector } from "@/hooks/dispatch/dispatch";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormResetPassword } from "@/types/form";

const ResetPasswordContainer = () => {
  const namespace = useAppNameSpase();
  const curentEmail = useAppSelector((state) => state.otp.email);
  const service = useService();
  const [formResetPassword, setFormResetPassword] = useState<FormResetPassword>(
    {
      email: curentEmail!,
      password: "",
    }
  );
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const reset = service.Auth.mutation.useResetPassoword();
  const handlerResetPassword = () => {
    if (!formResetPassword.password) {
      namespace.alert.toast({
        title: "warning",
        message: "colum is empty",
        icon: "warning",
      });
    } else if (confirmPassword !== formResetPassword.password) {
      namespace.alert.toast({
        title: "error",
        message: "colum password & confirm password not match",
        icon: "error",
      });
    } else {
      reset.mutate(formResetPassword, {
        onSuccess: () => {
          namespace.router.push("/login");
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
        <ResetPasswordHeroSection
          confirmPassword={confirmPassword}
          formResetPassword={formResetPassword}
          isPending={reset.isPending}
          onReset={() => handlerResetPassword()}
          setConfirmPassword={setConfirmPassword}
          setFormResetPassword={setFormResetPassword}
        />
      </div>
    </main>
  );
};

export default ResetPasswordContainer;
