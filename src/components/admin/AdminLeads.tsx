"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";

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

function cell(value?: string) {
  const text = value?.trim();
  return text ? text : "—";
}

export default function AdminLeads() {
  return (
    <AdminShell>
      <LeadsPage />
    </AdminShell>
  );
}

function LeadsPage() {
  const [leads, setLeads] = useState<AssessmentLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/assessments");
        const data = await res.json();
        if (cancelled) return;
        setLeads(Array.isArray(data?.assessments) ? data.assessments : []);
      } catch (err) {
        console.error("Failed to load leads", err);
        toast.error("Chargement impossible", {
          description: "Les leads n’ont pas pu être récupérés.",
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

  return (
    <main className="flex-1 overflow-y-auto bg-white px-4 py-6 dark:bg-neutral-950 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Coordonnées et résultats des diagnostics envoyés.
          </p>
        </header>

        {loading ? (
          <div className="h-80 animate-pulse rounded-xl bg-neutral-100 dark:bg-white/5" />
        ) : leads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center text-sm text-neutral-500 dark:border-white/15">
            Aucun lead pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Organisation</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Courriel</th>
                  <th className="px-4 py-3 font-medium">Secteur</th>
                  <th className="px-4 py-3 font-medium">Taille</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Niveau</th>
                  <th className="px-4 py-3 font-medium">Infolettre</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">{cell(lead.companyName)}</td>
                    <td className="px-4 py-3">{cell(lead.contactName)}</td>
                    <td className="px-4 py-3">
                      {lead.email?.trim() ? (
                        <a
                          href={`mailto:${lead.email}`}
                          className="underline underline-offset-2"
                        >
                          {lead.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">{cell(lead.context?.sector)}</td>
                    <td className="px-4 py-3">
                      {cell(lead.context?.organizationSize)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {lead.totalScore}/96
                    </td>
                    <td className="px-4 py-3">{cell(lead.maturityLevel)}</td>
                    <td className="px-4 py-3">
                      {lead.context?.marketingConsent ? "Oui" : "Non"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
