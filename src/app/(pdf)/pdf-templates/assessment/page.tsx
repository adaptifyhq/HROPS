import { Metadata } from "next";
import Image from "next/image";
import { findAssessmentById } from "@/lib/assessments";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Diagnostic RH – Rapport PDF | HROps Consulting",
  description: "Rapport de Maturité Digitale RH - HROps Consulting",
};

interface AssessmentDoc {
  _id: string;
  companyName?: string;
  contactName?: string;
  email?: string;
  totalScore: number;
  maturityLevel: string;
  aiAnalysis?: string;
  createdAt?: Date;
}

export default async function AssessmentPdfTemplate({
  searchParams,
}: {
  searchParams: Promise<{ assessmentId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const assessmentId = resolvedParams.assessmentId;

  if (!assessmentId)
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-400 text-lg">
        Aucun ID de diagnostic fourni.
      </div>
    );

  const assessment = (await findAssessmentById(
    assessmentId
  )) as AssessmentDoc | null;

  if (!assessment)
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-400 text-lg">
        Diagnostic introuvable.
      </div>
    );

  // -------------------------------------------------------
  // COLORS / METRICS
  // -------------------------------------------------------
  // -------------------------------------------------------
  // LEVEL TRANSLATION + COLORS / METRICS
  // -------------------------------------------------------
  const levelMap: Record<string, string> = {
    Débutant: "Starter",
    "En progrès": "Optimizer",
    Avancé: "Leader",
    Starter: "Starter",
    Optimizer: "Optimizer",
    Leader: "Leader",
  };

  const displayLevel = levelMap[assessment.maturityLevel] || "Starter";

  let levelColor = "#d90429";
  if (displayLevel === "Optimizer") levelColor = "#ffb703";
  if (displayLevel === "Leader") levelColor = "#00b368";

  const percentage = Math.round((assessment.totalScore / 96) * 100);
  const generationDate = new Date(
    assessment.createdAt || new Date()
  ).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // -------------------------------------------------------
  // TEMPLATE
  // -------------------------------------------------------
  return (
    <div className="bg-white text-gray-900 font-sans antialiased leading-relaxed tracking-wide">
      {/* =================== HEADER =================== */}
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 text-white py-10 px-14 shadow-lg">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern-light.svg')] bg-cover" />
        <div className="relative flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-2.png"
              alt="HROps Logo"
              width={150}
              height={45}
              className="drop-shadow-lg brightness-110"
            />
          </div>
          <div className="text-right text-sm leading-snug">
            <div className="opacity-90">
              Généré le{" "}
              <span className="font-semibold text-white">{generationDate}</span>
            </div>
            <div className="text-white font-semibold mt-1">
              Diagnostic RH Digital
            </div>
          </div>
        </div>
      </header>

      {/* =================== COVER =================== */}
      <section className="relative text-center py-24 px-10 border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            Rapport – Diagnostic de Maturité Digitale RH
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg">
            Évaluation réalisée par{" "}
            <span className="font-semibold text-orange-600">
              HROps Consulting
            </span>
            , basée sur 8 dimensions de maturité numérique RH.
          </p>

          <div className="mt-12 flex justify-center">
            <div className="bg-gradient-to-r from-orange-500 to-amber-400 text-white py-4 px-10 rounded-xl shadow-md font-medium">
              Rapport confidentiel
            </div>
          </div>
        </div>
      </section>

      {/* =================== COMPANY INFO =================== */}
      <section className="px-14 py-10">
        <div className="bg-orange-50/80 border-l-4 border-orange-500 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Informations de l’entreprise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
            <div>
              <p className="mb-2">
                <strong>Entreprise :</strong>{" "}
                {assessment.companyName || "Non spécifié"}
              </p>
              <p className="mb-2">
                <strong>Contact :</strong>{" "}
                {assessment.contactName || "Non spécifié"}
              </p>
              <p>
                <strong>Email :</strong> {assessment.email || "Non spécifié"}
              </p>
            </div>
            <div className="flex justify-center sm:justify-end items-center">
              <Image
                src="/images/logo-2.png"
                alt="Company"
                width={120}
                height={120}
                className="opacity-70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================== RESULTS =================== */}
      <section className="px-14 py-10 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Résultats Clés
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-700 mb-3 text-lg">
              <strong>Score total :</strong>{" "}
              <span className="text-gray-900 font-semibold">
                {assessment.totalScore} / 96
              </span>
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Niveau :</strong>{" "}
              <span className="font-semibold" style={{ color: levelColor }}>
                {displayLevel}
              </span>
            </p>

            {/* Progress Bar */}
            <div className="mt-6 h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-5 rounded-full transition-all duration-700"
                style={{
                  width: `${percentage}%`,
                  background: levelColor,
                }}
              />
            </div>

            <div className="text-sm mt-2 text-gray-500">
              Progression vers la maturité digitale : {percentage}%
            </div>
          </div>

          {/* RIGHT COLUMN - CIRCLE */}
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-44 h-44">
              <svg
                className="absolute top-0 left-0 w-44 h-44"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#eee"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke={levelColor}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 326} 326`}
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-gray-800">
                  {percentage}%
                </div>
                <div className="text-sm text-gray-500">Maturité digitale</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-dashed border-gray-300"></div>

        {/* Interpretation */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Interprétation du niveau
          </h3>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {assessment.maturityLevel === "Avancé" && (
              <>
                Votre organisation se situe dans la zone <strong>Leader</strong>
                , démontrant une intégration solide des outils numériques et une
                gouvernance RH stratégique.
              </>
            )}
            {assessment.maturityLevel === "En progrès" && (
              <>
                Votre entreprise est en phase de <strong>Consolidation</strong>.
                Des fondations solides sont présentes, mais une meilleure
                cohérence et intégration technologique sont nécessaires.
              </>
            )}
            {assessment.maturityLevel === "Débutant" && (
              <>
                Votre organisation se trouve en phase <strong>Initiale</strong>.
                Les bases de la digitalisation RH sont à construire via une
                feuille de route structurée.
              </>
            )}
          </p>
        </div>
      </section>

      {/* =================== AI ANALYSIS =================== */}
      <section className="px-14 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Analyse IA Personnalisée
        </h2>

        <div className="bg-white border border-orange-100 rounded-xl shadow-sm p-8">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {assessment.aiAnalysis || "Aucune analyse disponible."}
          </p>
        </div>
      </section>

      {/* =================== NEXT STEPS =================== */}
      <section className="px-14 py-12 border-t border-gray-200 bg-orange-50/60">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recommandations & Prochaines Étapes
        </h2>

        <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-3">
          <li>
            Organiser une session de <strong>revue stratégique</strong> avec
            HROps pour interpréter les résultats en profondeur.
          </li>
          <li>
            Définir un <strong>plan d’action digital RH</strong> sur 6 à 12 mois
            selon les priorités identifiées.
          </li>
          <li>
            Prioriser les chantiers de <strong>gouvernance</strong> et d’
            <strong>automatisation</strong> avant toute implémentation
            technique.
          </li>
          <li>
            Mesurer la progression à l’aide d’un{" "}
            <strong>indicateur trimestriel</strong> de maturité digitale RH.
          </li>
        </ul>

        <div className="mt-10 p-6 bg-gradient-to-r from-orange-500 to-amber-400 rounded-lg text-white text-center shadow-md">
          <p className="text-lg font-semibold">
            HROps Consulting peut vous accompagner pour transformer ces
            résultats en un plan d’action concret.
          </p>
          <p className="text-sm opacity-90 mt-1">
            Contactez-nous pour une session d’interprétation gratuite.
          </p>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="border-t border-gray-300 py-8 text-center text-sm text-gray-500 mt-10">
        <p>
          Rapport généré automatiquement par la solution IA de{" "}
          <span className="font-semibold text-orange-600">
            HROps Consulting
          </span>
          .
        </p>
        <p className="mt-1 text-orange-500 font-semibold">
          © {new Date().getFullYear()} HROps Consulting – Diagnostic Digital RH
        </p>
      </footer>
    </div>
  );
}
