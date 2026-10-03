"use client";

import { ThemeProvider } from "next-themes";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/sections/Footer";
import CookiePreferences from "@/components/global/CookiePreferences";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import LogoIntro from "@/components/ui/LogoIntro";
import Navbar from "@/sections/Navbar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // ✅ NEW: Disable for PDF routes too
  const isPdfRoute = pathname.startsWith("/pdf-templates");

  const logoRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {/* Hide navbar, logo intro, and footer for admin & PDF */}
      {!isAdminRoute && !isPdfRoute && <LogoIntro targetRef={logoRef} />}
      {!isAdminRoute && !isPdfRoute && <Navbar logoRef={logoRef} />}
      {!isAdminRoute && !isPdfRoute && (
        <ScrollProgress className="top-0 z-[100] fixed h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 transition-all duration-300" />
      )}

      {children}

      <Toaster position="top-right" richColors closeButton />
      {!isAdminRoute && !isPdfRoute && <CookiePreferences />}
      {!isAdminRoute && !isPdfRoute && <Footer />}
    </ThemeProvider>
  );
}
