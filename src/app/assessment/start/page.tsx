"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const deliverables = [
  "votre niveau global de maturité",
  "votre profil détaillé par dimension",
  "vos principales forces et zones de progression",
  "vos priorités recommandées",
  "un rapport PDF personnalisé",
];

export default function AssessmentStartPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-950 overflow-hidden px-6 py-24">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.45]"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative max-w-3xl text-center space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm tracking-[0.18em] uppercase text-orange-300"
        >
          Analyse personnalisée assistée par IA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight"
        >
          Diagnostic de maturité digitale RH
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-neutral-200 leading-relaxed max-w-2xl mx-auto"
        >
          Où en est votre fonction RH dans sa transformation numérique ?
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto"
        >
          En quelques minutes, obtenez une première lecture structurée de votre maturité
          digitale RH à travers 8 dimensions clés : stratégie, SIRH, processus, données,
          expérience, compétences, conformité et adoption.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-left max-w-xl mx-auto text-neutral-300 space-y-2"
        >
          <p className="text-white font-medium">À la fin de l&apos;évaluation, vous recevrez :</p>
          <ul className="space-y-1 text-sm">
            {deliverables.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </motion.div>

        <p className="text-neutral-400 text-sm tracking-wide">
          32 questions • Environ 7 minutes • Rapport personnalisé
        </p>

        <Link href="/assessment/questions">
          <Button
            size="lg"
            className="group px-10 py-6 text-lg font-medium rounded-2xl bg-white text-black hover:bg-neutral-200 transition"
          >
            Commencer mon diagnostic
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
          </Button>
        </Link>

        <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Ce diagnostic est une autoévaluation indicative et ne remplace pas un audit approfondi.
          Vos renseignements sont traités conformément à notre{" "}
          <Link href="/privacy" className="underline">
            Politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
