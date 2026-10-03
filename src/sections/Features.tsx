
"use client";

import React from "react";
import { StatsWithGridBackground } from "@/components/ui/StatsWithGridBackground";
import AnimationContainer from "@/components/ui/animation-container";

const expertises = [
  {
    title: "Transformation RH & SIRH",
    text: "Cadrer la transformation, clarifier les priorités et construire une feuille de route réaliste.",
  },
  {
    title: "Diagnostic et analyse des besoins",
    text: "Évaluer les processus, irritants, données, interfaces et besoins métiers avant de choisir ou de faire évoluer une solution.",
  },
  {
    title: "Sélection de solutions et appels d'offres",
    text: "Structurer les exigences, comparer les solutions et soutenir la décision, sans lien avec un éditeur.",
  },
  {
    title: "Implantation SIRH",
    text: "Accompagner la gouvernance, la conception, le paramétrage, les essais, le déploiement et la stabilisation.",
  },
  {
    title: "Optimisation et amélioration continue",
    text: "Faire évoluer les processus et l'utilisation du SIRH après le déploiement afin d'en tirer davantage de valeur.",
  },
  {
    title: "Conduite du changement",
    text: "Préparer les équipes, les gestionnaires et les utilisateurs aux nouvelles façons de travailler.",
  },
];

const sectors = [
  {
    title: "Municipalités et secteur public",
    text: "Paie, gestion du temps, conventions collectives, main-d'œuvre, gouvernance, appels d'offres et déploiement de solutions RH.",
  },
  {
    title: "Organisations parapubliques et communautaires",
    text: "Analyse des processus, modernisation des pratiques, choix technologiques, implantation et amélioration continue.",
  },
  {
    title: "Entreprises privées",
    text: "Diagnostic technologique RH, sélection et implantation SIRH, optimisation des processus et accompagnement de la transformation.",
  },
];

const Features = () => {
  return (
    
    <section id="expertise" className="relative z-10 flex w-full flex-col items-center justify-center overflow-hidden px-4 py-20 text-center space-y-16 bg-background dark:bg-[#0a0a0a]">

      {/* 🌙 Dark mode glow */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <div
          className="h-full w-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,165,0,0.15), transparent 70%)",
            maskImage: "radial-gradient(ellipse at center, white, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse at center, white, transparent)",
          }}
        />
      </div>

      {/* ☀️ Light mode fallback */}
      <div className="absolute inset-0 -z-10 block dark:hidden bg-white" />

      {/* Heading and glowing button */}
      <AnimationContainer delay={0.4}>
      <div className="relative z-10">
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFA726_0%,#FB8C00_50%,#FFA726_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-slate-950 px-4 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
            Nos expertises
          </span>
        </button>
        <AnimationContainer delay={0.3}>
        <h2 className="mt-6 text-3xl font-bold text-black dark:text-white md:text-5xl">
          Nos expertises
        </h2>
        </AnimationContainer>

        <p className="mx-auto mt-2 max-w-2xl text-base text-neutral-700 dark:text-neutral-300 md:text-lg">
          Diagnostic SIRH, analyse des besoins, sélection de solutions, appels d&apos;offres, implantation, optimisation et conduite du changement.
        </p>
      </div>
      </AnimationContainer>

      {/* 📊 Stats */}
      <AnimationContainer delay={0.6}>
      <div className="relative z-10 w-full">
        <StatsWithGridBackground />
      </div>
      </AnimationContainer>

      <div className="relative z-10 grid w-full max-w-6xl gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
        {expertises.map((item) => (
          <article key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.text}</p>
          </article>
        ))}
      </div>

      <div id="secteurs" className="relative z-10 w-full max-w-6xl pt-16 text-left">
        <h2 className="text-center text-3xl font-bold text-black dark:text-white md:text-4xl">
          Des approches adaptées à votre environnement
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {sectors.map((item) => (
            <article key={item.title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
