"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  formatAverage,
  getDimensionScores,
  levelReading,
  type MaturityLevel,
} from "@/lib/assessment";

const levelCopy: Record<MaturityLevel, string> = {
  Leader:
    "Plusieurs dimensions sont déjà structurées. Une analyse experte permet de vérifier si cette maturité est homogène et de décider quoi consolider ensuite.",
  Optimizer:
    "Vous avez déjà posé plusieurs fondations importantes. Votre principal enjeu est maintenant de transformer ces acquis en un environnement RH plus intégré, mieux appuyé par les données et réellement adopté.",
  Starter:
    "Plusieurs fondations restent à structurer. Le résultat sert à choisir les premiers chantiers, pas à conclure que rien n'existe.",
};

export default function AssessmentResultsPage() {
  const router = useRouter();
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [result, setResult] = useState<{
    totalScore: number;
    maturityLevel: string;
    answers: Record<string, number>;
    sector?: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("assessment_result");
    if (!stored) {
      router.push("/assessment/start");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      let level = parsed.maturityLevel as string;
      if (level === "Débutant") level = "Starter";
      else if (level === "En progrès") level = "Optimizer";
      else if (level === "Avancé") level = "Leader";

      setResult({
        totalScore: parsed.totalScore,
        maturityLevel: level,
        answers: parsed.answers || {},
        sector: parsed.context?.sector,
      });
    } catch {
      router.push("/assessment/start");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <span className="opacity-60 text-lg">Chargement des résultats...</span>
      </div>
    );
  }

  const levelLabel = (["Starter", "Optimizer", "Leader"].includes(result.maturityLevel)
    ? result.maturityLevel
    : "Starter") as MaturityLevel;
  const average = result.totalScore / 32;
  const dimensions = getDimensionScores(result.answers);

  async function downloadPDF() {
    const assessmentId = localStorage.getItem("assessment_id");
    if (!assessmentId) {
      alert("ID du diagnostic introuvable.");
      return;
    }

    setLoadingPDF(true);
    try {
      const res = await fetch("/api/assessment/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId }),
      });
      if (!res.ok) throw new Error("Erreur lors de la génération du PDF.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Diagnostic_HROps.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setLoadingPDF(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <button
        onClick={() => router.push("/assessment/start")}
        className="absolute top-10 left-10 text-neutral-400 hover:text-white transition flex items-center gap-2 z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="relative z-10 max-w-3xl mx-auto pt-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.16em] text-orange-300 text-center"
        >
          Votre diagnostic est prêt
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold text-center mt-4"
        >
          Niveau : {levelLabel}
        </motion.h1>
        <p className="text-center text-neutral-300 mt-3">
          Score global {result.totalScore} / 96 · Moyenne {formatAverage(average)} / 3
        </p>
        <p className="text-neutral-300 leading-relaxed mt-8 text-center">
          {levelCopy[levelLabel]}
        </p>
        <p className="text-sm text-neutral-400 leading-relaxed mt-4 text-center">
          {levelReading(levelLabel, result.sector)}
        </p>

        <div className="mt-12 space-y-4">
          {dimensions.map((dimension) => (
            <div key={dimension.id}>
              <div className="flex justify-between text-sm mb-1 gap-4">
                <span>{dimension.title}</span>
                <span className="text-neutral-400 shrink-0">
                  {dimension.score}/{dimension.maxScore} · {dimension.level}
                </span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${(dimension.score / dimension.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadPDF}
            disabled={loadingPDF}
            className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {loadingPDF ? "Génération du PDF..." : "Télécharger mon rapport"}
          </button>
        </div>

        <div className="mt-14 border border-neutral-800 rounded-2xl p-8 bg-neutral-950/70">
          <p className="text-sm uppercase tracking-wide text-orange-300">Aller plus loin</p>
          <h2 className="text-2xl font-semibold mt-3">
            Un score indique où vous vous situez. Une analyse experte permet de comprendre pourquoi.
          </h2>
          <p className="text-neutral-300 mt-4 leading-relaxed">
            Réservez une session d&apos;interprétation de 30 minutes avec HROps Consulting Inc. afin
            de revoir vos résultats, challenger les priorités et identifier les prochains chantiers.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 px-8 py-3 rounded-2xl bg-white text-black font-semibold"
          >
            Réserver ma session d&apos;interprétation
          </Link>
        </div>
      </div>
    </div>
  );
}
