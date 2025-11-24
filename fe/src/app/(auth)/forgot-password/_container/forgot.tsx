"use client";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import ForgotHeroSection from "@/components/section/auth/forgot-hero-section";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormForgotPassword } from "@/types/form/auth.form";

const ForgotContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const [formForgot, setFormForgot] = useState<FormForgotPassword>({
    email: "",
  });
  const forgot = service.Auth.mutation.useForgotPassword();
  const handleForgot = () => {
    if (!formForgot.email) {
      namespace.alert.toast({
        title: "warning",
        message: "colum is empty",
        icon: "warning",
      });
    } else {
      forgot.mutate(formForgot, {
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
        <ForgotHeroSection
          formForgot={formForgot}
          isPending={forgot.isPending}
          onForgot={() => handleForgot()}
          setFormForgot={setFormForgot}
        />
      </div>
    </main>
  );
};

export default ForgotContainer;
