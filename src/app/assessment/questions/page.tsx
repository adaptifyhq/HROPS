"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  contextQuestions,
  optionLevelLabel,
  questions,
  themes,
  type AssessmentContext,
} from "@/lib/assessment";
import { ArrowLeft, ChevronRight, Circle, CheckCircle2 } from "lucide-react";

const allQuestions = questions;

export default function QuestionsPage() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [context, setContext] = useState<AssessmentContext>({});

  const [email, setEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [loadingGenerate, setLoadingGenerate] = useState(false);

  const scoredCount = allQuestions.length;
  const contextCount = contextQuestions.length;
  const totalSteps = scoredCount + contextCount + 1;
  const isContext = index >= scoredCount && index < scoredCount + contextCount;
  const isContact = index === scoredCount + contextCount;
  const contextItem = isContext ? contextQuestions[index - scoredCount] : null;
  const progress = ((index + 1) / totalSteps) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  function selectAnswer(score: number) {
    const question = allQuestions[index];
    setAnswers({ ...answers, [question.id]: score });
    setTimeout(() => setIndex(index + 1), 350);
  }

  function selectContext(value: string) {
    if (!contextItem) return;
    setContext({ ...context, [contextItem.id]: value });
    setTimeout(() => setIndex(index + 1), 350);
  }

  async function submitFinal() {
    if (!email.trim()) return alert("Veuillez entrer un courriel.");

    setLoadingGenerate(true);

    try {
      const res = await fetch("/api/assessment/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          email,
          contactName,
          companyName,
          context: { ...context, marketingConsent },
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert("Erreur lors de la génération.");
        setLoadingGenerate(false);
        return;
      }

      const assessment = json.assessment || json;
      localStorage.setItem("assessment_result", JSON.stringify(assessment));
      localStorage.setItem("assessment_id", assessment._id);
      router.push("/assessment/results");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }

    setLoadingGenerate(false);
  }

  const themeTitle = !isContext && !isContact
    ? themes.find((theme) => theme.id === allQuestions[index]?.themeId)?.title
    : "";

  let stepLabel = "Vos coordonnées";
  if (!isContext && !isContact) stepLabel = `Question ${index + 1} / ${scoredCount}`;
  if (isContext) stepLabel = `Contexte ${index - scoredCount + 1} / ${contextCount}`;

  return (
    <div className="relative min-h-screen w-full px-6 pt-24 pb-16 text-white flex flex-col items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />
      <div className="absolute inset-0 bg-neutral-950/70" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-neutral-400 mb-3 text-sm">{stepLabel}</p>
          <div className="w-full h-2 bg-neutral-800/70 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isContext && !isContact && (
            <motion.div
              key={allQuestions[index].id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-center gap-2 text-orange-400 uppercase text-sm tracking-wide text-center">
                <ChevronRight className="w-4 h-4 shrink-0" />
                {themeTitle}
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold text-center leading-tight">
                {allQuestions[index].question}
              </h1>

              <div className="space-y-4 mt-6">
                {allQuestions[index].options.map((opt) => {
                  const selected = answers[allQuestions[index].id] === opt.score;
                  return (
                    <motion.button
                      key={opt.score}
                      onClick={() => selectAnswer(opt.score)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full px-6 py-4 rounded-xl border flex items-start gap-3 text-left transition-all backdrop-blur-sm
                      ${selected
                        ? "border-orange-500 bg-orange-600/20 text-orange-300 shadow-md shadow-orange-900/30"
                        : "border-neutral-700/70 hover:border-neutral-500/70 hover:bg-neutral-900/50 text-neutral-300"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-600 mt-0.5 shrink-0" />
                      )}
                      <span>
                        <span className="font-semibold">{optionLevelLabel(opt.score)}</span>
                        {" — "}
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {contextItem && (
            <motion.div
              key={contextItem.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="space-y-12"
            >
              <p className="text-center text-sm text-neutral-400">
                Ces questions situent votre organisation. Elles ne modifient pas le score.
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-center leading-tight">
                {contextItem.question}
              </h1>
              <div className="space-y-4">
                {contextItem.options.map((option) => {
                  const selected = context[contextItem.id] === option;
                  return (
                    <motion.button
                      key={option}
                      onClick={() => selectContext(option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full px-6 py-4 rounded-xl border flex items-center gap-3 text-left transition-all
                      ${selected
                        ? "border-orange-500 bg-orange-600/20 text-orange-300"
                        : "border-neutral-700/70 hover:border-neutral-500/70 hover:bg-neutral-900/50 text-neutral-300"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-600 shrink-0" />
                      )}
                      <span>{option}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {isContact && (
            <motion.div
              key="final-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
              className="mt-8 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 backdrop-blur space-y-6"
            >
              <h2 className="text-xl font-semibold text-center">Vos coordonnées</h2>
              <div className="text-sm text-neutral-300 space-y-3 leading-relaxed">
                <p className="font-semibold text-white">Protection de vos renseignements</p>
                <p>
                  Les renseignements fournis dans ce diagnostic sont utilisés par HROps Consulting Inc.
                  afin de générer votre évaluation de maturité digitale RH, produire votre rapport
                  personnalisé et, si vous le demandez ou y consentez lorsque requis, communiquer avec
                  vous au sujet de votre résultat ou de nos services.
                </p>
                <p>
                  Le diagnostic peut générer des conclusions ou recommandations à partir de vos réponses.
                  Pour en savoir plus, consultez notre{" "}
                  <Link href="/privacy" className="underline text-orange-300">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </div>

              <input
                className="w-full px-4 py-3 bg-neutral-800 rounded-xl border border-neutral-700"
                placeholder="Votre courriel *"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 bg-neutral-800 rounded-xl border border-neutral-700"
                placeholder="Nom complet (optionnel)"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 bg-neutral-800 rounded-xl border border-neutral-700"
                placeholder="Nom de l'organisation (optionnel)"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <label className="flex items-start gap-3 text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  Je souhaite recevoir les analyses, ressources et communications de HROps Consulting Inc.
                  par courriel. Je peux retirer mon consentement en tout temps.
                </span>
              </label>

              <button
                onClick={submitFinal}
                disabled={loadingGenerate}
                className="w-full bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-semibold"
              >
                {loadingGenerate ? "Préparation du diagnostic..." : "Voir mes résultats"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {index > 0 && (
          <motion.button
            onClick={() => setIndex(index - 1)}
            whileHover={{ scale: 1.05 }}
            className="mt-12 mx-auto block text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </motion.button>
        )}
      </div>
    </div>
  );
}
