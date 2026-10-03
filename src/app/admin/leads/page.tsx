"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLeads from "@/components/admin/AdminLeads";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth");
    if (isAuth !== "true") {
      router.replace("/admin/login");
    }
  }, [router]);

  return <AdminLeads />;
}
