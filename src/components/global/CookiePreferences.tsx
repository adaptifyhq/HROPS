"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookiePreferences() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener("open-cookie-preferences", openPanel);
    return () => window.removeEventListener("open-cookie-preferences", openPanel);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-neutral-800 shadow-xl dark:bg-neutral-950 dark:text-neutral-100">
        <h2 className="text-xl font-semibold">Préférences de confidentialité</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          HROps Consulting Inc. n&apos;active actuellement aucun témoin de mesure,
          de marketing ou de personnalisation. Seules les technologies strictement
          nécessaires au fonctionnement du site peuvent être utilisées. Elles ne
          peuvent pas être désactivées ici.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          Si un outil facultatif est ajouté plus tard, il ne sera pas chargé avant
          un choix explicite. Le détail figure dans la{" "}
          <Link href="/privacy" className="underline" onClick={() => setOpen(false)}>
            Politique de confidentialité
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-6 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
