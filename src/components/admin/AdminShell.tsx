"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  IconArticle,
  IconHome,
  IconLogout,
  IconUsers,
  IconMoon,
  IconPlus,
  IconSun,
  IconWorldWww,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/layouts/SidebarLayout";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const links = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      href: "/admin",
      icon: <IconHome className="h-5 w-5" />,
      active: pathname === "/admin",
    },
    {
      id: "leads",
      label: "Leads",
      href: "/admin/leads",
      icon: <IconUsers className="h-5 w-5" />,
      active: pathname?.startsWith("/admin/leads"),
    },
    {
      id: "create",
      label: "Nouvel article",
      href: "/admin/blogs/create",
      icon: <IconPlus className="h-5 w-5" />,
      active: pathname?.startsWith("/admin/blogs/create"),
    },
    {
      id: "blog",
      label: "Blog public",
      href: "/blog",
      icon: <IconArticle className="h-5 w-5" />,
      active: false,
    },
    {
      id: "site",
      label: "Site web",
      href: "/",
      icon: <IconWorldWww className="h-5 w-5" />,
      active: false,
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <Sidebar>
        <SidebarBody className="justify-between gap-8 border-r border-neutral-200/80 bg-white dark:border-white/10 dark:bg-neutral-950">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2">
              <Image
                src="/images/logo-2.png"
                alt="HROps"
                width={36}
                height={36}
                className="rounded-lg object-contain"
                priority
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight">HROps</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Administration
                </p>
              </div>
            </Link>

            <nav className="mt-8 flex flex-col gap-1">
              {links.map((link) => (
                <SidebarLink
                  key={link.id}
                  id={link.id}
                  className={cn(
                    "rounded-xl px-2",
                    link.active &&
                      "bg-neutral-100 dark:bg-neutral-800"
                  )}
                  link={{
                    label: link.label,
                    href: link.href,
                    icon: link.icon,
                  }}
                />
              ))}

              {mounted && (
                <SidebarLink
                  id="theme"
                  className="rounded-xl px-2"
                  link={{
                    label: theme === "dark" ? "Mode clair" : "Mode sombre",
                    href: "#",
                    icon:
                      theme === "dark" ? (
                        <IconSun className="h-5 w-5 text-amber-400" />
                      ) : (
                        <IconMoon className="h-5 w-5" />
                      ),
                    onClick: () =>
                      setTheme(theme === "dark" ? "light" : "dark"),
                  }}
                />
              )}
            </nav>
          </div>

          <div className="space-y-3 px-1 pb-2">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold dark:bg-neutral-800">
                FK
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Fayçal Khadad</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Administrateur
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("admin-auth");
                window.location.href = "/admin/login";
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white dark:text-red-400"
            >
              <IconLogout className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
