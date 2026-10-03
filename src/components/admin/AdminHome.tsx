"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  IconCalendarMonth,
  IconChecklist,
  IconClockHour4,
  IconFileText,
  IconPencil,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface Blog {
  _id: string;
  title: string;
  author: string;
  content: string;
  description: string;
  thumbnail?: string;
  imageBase64?: string;
  createdAt: string;
}

interface AssessmentLead {
  _id: string;
  companyName: string;
  contactName: string;
  email: string;
  totalScore: number;
  maturityLevel: string;
  createdAt: string;
  context?: {
    organizationSize?: string;
    sector?: string;
    hrTeamSize?: string;
    primarySirh?: string;
    currentPriority?: string;
    marketingConsent?: boolean;
  } | null;
}

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFormatter.format(date);
}

export default function AdminHome() {
  return (
    <AdminShell>
      <Dashboard />
    </AdminShell>
  );
}

function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [leads, setLeads] = useState<AssessmentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [blogsRes, assessmentsRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/admin/assessments"),
        ]);
        const blogsData = await blogsRes.json();
        const assessmentsData = await assessmentsRes.json();
        if (cancelled) return;

        setBlogs(Array.isArray(blogsData) ? blogsData : []);
        setLeads(
          Array.isArray(assessmentsData?.assessments)
            ? assessmentsData.assessments
            : []
        );
      } catch (err) {
        console.error("Failed to load dashboard", err);
        toast.error("Chargement impossible", {
          description: "Les données du tableau de bord n’ont pas pu être récupérées.",
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = blogs.filter((blog) => {
      const created = new Date(blog.createdAt);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length;
    const latest = blogs[0]?.createdAt;

    return [
      {
        label: "Articles publiés",
        value: String(blogs.length),
        hint: blogs.length === 0 ? "Bibliothèque vide" : "Sur le blog HROps",
        icon: IconFileText,
        href: "",
      },
      {
        label: "Ce mois-ci",
        value: String(thisMonth),
        hint: thisMonth === 0 ? "Aucun nouvel article" : "Publications du mois",
        icon: IconCalendarMonth,
        href: "",
      },
      {
        label: "Diagnostics RH",
        value: String(leads.length),
        hint:
          leads.length === 0
            ? "Aucun diagnostic reçu"
            : "Voir les leads",
        icon: IconChecklist,
        href: "/admin/leads",
      },
      {
        label: "Dernière publication",
        value: latest ? formatDate(latest) : "—",
        hint: latest ? "Article le plus récent" : "En attente du premier texte",
        icon: IconClockHour4,
        compact: Boolean(latest),
        href: "",
      },
    ];
  }, [leads.length, blogs]);

  const filteredBlogs = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return blogs;
    return blogs.filter((blog) =>
      [blog.title, blog.description, blog.author]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [blogs, query]);

  async function deleteBlog(id: string) {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("Article supprimé", {
        description: "L’article a bien été retiré du blog.",
      });
    } catch {
      toast.error("Suppression impossible", {
        description: "Une erreur est survenue. Réessayez dans un instant.",
      });
    }
  }

  return (
    <main className="flex-1 overflow-y-auto bg-white px-4 py-6 dark:bg-neutral-950 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Articles</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Rédigez et publiez les articles du blog.
            </p>
          </div>
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            Nouvel article
          </Link>
        </header>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const card = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-neutral-500">{stat.label}</p>
                        <p
                          className={cn(
                            "mt-2 font-semibold",
                            stat.compact ? "text-base" : "text-2xl"
                          )}
                        >
                          {stat.value}
                        </p>
                      </div>
                      <stat.icon className="h-5 w-5 text-neutral-400" />
                    </div>
                    <p className="mt-2 text-sm text-neutral-500">{stat.hint}</p>
                  </>
                );
                const className =
                  "rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900";
                return stat.href ? (
                  <Link key={stat.label} href={stat.href} className={className}>
                    {card}
                  </Link>
                ) : (
                  <article key={stat.label} className={className}>
                    {card}
                  </article>
                );
              })}
            </section>

            {!blogs.length ? (
              <EmptyBlogState />
            ) : (
              <section className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Articles</h2>
                    <p className="text-sm text-neutral-500">
                      {filteredBlogs.length} résultat
                      {filteredBlogs.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <label className="relative w-full sm:max-w-xs">
                    <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher un article…"
                      className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-orange-500/30 placeholder:text-neutral-400 focus:ring-2 dark:border-white/10 dark:bg-white/5"
                    />
                  </label>
                </div>

                {filteredBlogs.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-white/15">
                    <p className="text-base font-medium">Aucun résultat</p>
                    <p className="mt-2 text-sm text-neutral-500">
                      Aucun article ne correspond à « {query} ».
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredBlogs.map((blog) => (
                      <li
                        key={blog._id}
                        className="group flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:flex-row sm:items-center"
                      >
                        <div className="h-24 w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-white/10 sm:h-20 sm:w-28">
                          {blog.thumbnail || blog.imageBase64 ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={blog.thumbnail || blog.imageBase64}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-orange-400">
                              <IconFileText className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-semibold">
                            {blog.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                            {blog.description || "Aucune description"}
                          </p>
                          <p className="mt-2 text-xs text-neutral-400">
                            {blog.author || "Auteur inconnu"} ·{" "}
                            {formatDate(blog.createdAt)}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <Link
                            href={`/admin/blogs/${blog._id}/edit`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium transition hover:border-orange-300 hover:text-orange-600 dark:border-white/15"
                          >
                            <IconPencil className="h-3.5 w-3.5" />
                            Modifier
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-600 hover:text-white dark:border-red-500/30"
                              >
                                <IconTrash className="h-3.5 w-3.5" />
                                Supprimer
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-950">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Supprimer cet article ?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action est définitive. « {blog.title} »
                                  sera retiré du blog et ne pourra pas être
                                  récupéré.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 text-white hover:bg-red-700"
                                  onClick={() => deleteBlog(blog._id)}
                                >
                                  Oui, supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function EmptyBlogState() {
  return (
    <section className="rounded-xl border border-neutral-200 px-6 py-16 text-center dark:border-neutral-800">
      <p className="text-base font-medium">Aucun article</p>
      <p className="mt-2 text-sm text-neutral-500">
        Créez le premier pour l’afficher sur le blog.
      </p>
      <Link
        href="/admin/blogs/create"
        className="mt-6 inline-flex rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
      >
        Écrire un article
      </Link>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-3xl bg-white/70 dark:bg-white/5"
          />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-[32px] bg-white/70 dark:bg-white/5" />
    </div>
  );
}
