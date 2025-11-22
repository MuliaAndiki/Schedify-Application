"use client";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import LoginHeroSection from "@/components/section/auth/login-hero-section";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormLogin } from "@/types/form";

const LoginContainer = () => {
  const namespace = useAppNameSpase();
  const service = useService();
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const useLogin = service.Auth.mutation.useLogin();
  const handleLogin = () => {
    if (!formLogin.email || !formLogin.password) {
      namespace.alert.toast({
        title: "warning",
        message: "colum must not be empty",
        icon: "warning",
      });
    } else {
      useLogin.mutate(formLogin, {
        onSuccess: () => {
          namespace.router.push("/dashboard");
          setFormLogin({
            email: "",
            password: "",
          });
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
        <LoginHeroSection
          formLogin={formLogin}
          isPending={useLogin.isPending}
          onLogin={() => handleLogin()}
          setFormLogin={setFormLogin}
        />
      </div>
    </main>
  );
};

export default LoginContainer;
