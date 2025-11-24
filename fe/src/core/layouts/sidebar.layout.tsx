"use client";

import { useEffect, useState } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/core/components/app-sidebar";

import FooterApp from "../components/footer-app";
import LanguageDropdown from "../components/language.dropdown";
import NotificationDropdown from "../components/notification.dropdown";
import ThemeToggle from "../components/theme-toggle";
// import UserDropdown from '../components/user.dropdown';

// import AppBar from "../components/app-bar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: AppLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SidebarProvider defaultOpen>
      <div
        className={`flex min-h-screen w-full ${isScrolled ? "border-b-border shadow-md" : "border-b-transparent"}`}
      >
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-full flex-col w-full">
            <div className="flex p-4 items-center gap-2  w-full h-20">
              <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                <SidebarTrigger />
                <div className="flex items-center gap-4">
                  {/* <ThemeToggle />
                  <LanguageDropdown /> */}
                  <NotificationDropdown />
                  {/* <UserDropdown /> */}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto w-full">
              <div className="container h-full max-w-7xl w-full mx-auto p-4">
                {children}
              </div>
              <div className="fixed bottom-0 left-0 w-full z-20 ">
                <FooterApp />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
