"use client";
import { useState } from "react";
import { useEffect } from "react";

import VerifyOtpHeroSection from "@/components/section/auth/verifyOtp-hero-section";
import { useAppSelector } from "@/hooks/dispatch/dispatch";
import useService from "@/hooks/service/props.service";
import { useAppNameSpase } from "@/hooks/useNameSpace";
import { FormVerifyOtp } from "@/types/form";
const VerifyOtpContainer = () => {
  const namespase = useAppNameSpase();
  const service = useService();
  const otp = useAppSelector((state) => state.otp);
  const [colldown, setColldown] = useState<number>(0);
  const verify = service.Auth.mutation.useVerifyOtp();
  const resend = service.Auth.mutation.useSendOtp();
  const [formVerifyOtp, setFormVerifyOtp] = useState<FormVerifyOtp>({
    email: otp.email ?? "",
    otp: "",
  });
  const handleVerfiy = () => {
    if (otp.source === "forgot-password") {
      if (!formVerifyOtp.email || !formVerifyOtp.otp) {
        namespase.alert.toast({
          title: "Peringatan",
          message: "Email & Otp Failed",
          icon: "warning",
        });
      } else {
        verify.mutate(
          {
            email: formVerifyOtp.email,
            otp: formVerifyOtp.otp,
          },
          {
            onSuccess: () => {
              namespase.router.push("/reset-password");
            },
          }
        );
      }
    } else if (otp.source === "register") {
      if (!formVerifyOtp.email || !formVerifyOtp.otp) {
        namespase.alert.toast({
          title: "Peringatan",
          message: "Email & Otp Failed",
          icon: "warning",
        });
      } else {
        verify.mutate(
          {
            email: formVerifyOtp.email,
            otp: formVerifyOtp.otp,
          },
          {
            onSuccess: () => {
              namespase.router.push("/login");
            },
          }
        );
      }
    } else {
      return null;
    }
  };
  const handleResend = () => {
    resend.mutate(
      {
        email: otp.email ?? "",
      },
      {
        onSuccess: () => {
          setColldown(300);
        },
      }
    );
  };

  useEffect(() => {
    if (colldown <= 0) return;
    const internal = setInterval(() => {
      setColldown((prev) => {
        if (prev <= 1) {
          clearInterval(internal);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(internal);
  }, [colldown]);

  return (
    <main className="w-full min-h-screen flex flex-col">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xs">
          <VerifyOtpHeroSection
            colldown={colldown}
            formVerifyOtp={formVerifyOtp}
            isPending={verify.isPending || resend.isPending}
            onResend={() => handleResend()}
            onVerify={() => handleVerfiy()}
            setFormVerifyOtp={setFormVerifyOtp}
          />
        </div>
      </div>
    </main>
  );
};

export default VerifyOtpContainer;
