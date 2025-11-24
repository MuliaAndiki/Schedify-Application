"use client";
import HomeHeroSection from "@/components/section/public/hero-section";
import { themeConfig } from "@/configs/theme.config";
import NavLayout from "@/core/layouts/nav.layout";
import { useTheme } from "@/core/providers/theme.provider";

export default function ContainerHome() {
  const { theme } = useTheme();

  return (
    <NavLayout>
      <main
        className={`  mx-auto bg-[${themeConfig[theme].primary.background}]`}
      >
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
          <HomeHeroSection />
        </div>
      </main>
    </NavLayout>
  );
}
