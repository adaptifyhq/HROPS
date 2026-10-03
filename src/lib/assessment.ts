// -------------------------------------------------------------
// HROps – Digital HR Maturity Assessment Brain
// Rich Model (Themes + Questions + Scoring + Maturity Engine)
// -------------------------------------------------------------

export type LevelOption = {
  label: string;
  score: 1 | 2 | 3;
};

export type Question = {
  id: string;
  themeId: string;
  question: string;
  options: LevelOption[];
};

export type Theme = {
  id: string;
  title: string;
  maxScore: number; // Always 12
};

export const themes: Theme[] = [
  { id: "organisation_vision", title: "Stratégie & gouvernance RH digitale", maxScore: 12 },
  { id: "outils_rh", title: "SIRH & architecture technologique", maxScore: 12 },
  { id: "processus_rh", title: "Processus & automatisation", maxScore: 12 },
  { id: "donnees_rh", title: "Données RH & analytique", maxScore: 12 },
  { id: "experience_employe", title: "Expérience employé & gestionnaire", maxScore: 12 },
  { id: "competences_culture", title: "Compétences & culture digitale", maxScore: 12 },
  { id: "securite_loi25", title: "Sécurité, confidentialité & conformité", maxScore: 12 },
  { id: "collaboration_changement", title: "Adoption & conduite du changement", maxScore: 12 },
];

// -------------------------------------------------------------
// QUESTIONS – FULL 32 ITEMS
// -------------------------------------------------------------

export const questions: Question[] = [
  // -----------------------------
  // 1. ORGANISATION & VISION RH
  // -----------------------------
  {
    id: "vision_1",
    themeId: "organisation_vision",
    question: "Avez-vous une idée claire de ce que vous voulez améliorer en RH grâce au numérique ?",
    options: [
      { label: "Pas encore de vision ou de plan.", score: 1 },
      { label: "Une idée ou une intention, mais pas encore structurée.", score: 2 },
      { label: "Une vision claire et partagée avec l’équipe RH.", score: 3 },
    ],
  },
  {
    id: "vision_2",
    themeId: "organisation_vision",
    question: "Avez-vous un plan ou une feuille de route RH pour les mois à venir ?",
    options: [
      { label: "Non, rien de formel.", score: 1 },
      { label: "Quelques grandes étapes.", score: 2 },
      { label: "Un plan détaillé avec objectifs, budget et échéancier.", score: 3 },
    ],
  },
  {
    id: "vision_3",
    themeId: "organisation_vision",
    question: "Avez-vous désigné une personne ou un comité responsable du numérique RH ?",
    options: [
      { label: "Non, personne d’attitré.", score: 1 },
      { label: "Une personne s’en occupe parfois.", score: 2 },
      { label: "Un comité RH digital actif avec responsabilités claires.", score: 3 },
    ],
  },
  {
    id: "vision_4",
    themeId: "organisation_vision",
    question: "Vos projets RH numériques sont-ils organisés ?",
    options: [
      { label: "Non, on agit selon les urgences.", score: 1 },
      { label: "Planification partielle.", score: 2 },
      { label: "Projets priorisés et suivis avec rigueur.", score: 3 },
    ],
  },

  // -----------------------------
  // 2. OUTILS RH (SIRH)
  // -----------------------------
  {
    id: "outils_1",
    themeId: "outils_rh",
    question: "Quels outils utilisez-vous pour gérer les RH ?",
    options: [
      { label: "Excel, formulaires papier, courriels.", score: 1 },
      { label: "Un ou deux logiciels RH (paie, présence…).", score: 2 },
      { label: "Une plateforme RH complète (Recrutement, Paie, Temps…).", score: 3 },
    ],
  },
  {
    id: "outils_2",
    themeId: "outils_rh",
    question: "Vos outils RH sont-ils capables de se parler (intégrés) ?",
    options: [
      { label: "Non, tout est séparé.", score: 1 },
      { label: "Certains échanges manuels ou fichiers Excel.", score: 2 },
      { label: "Intégration automatisée entre les logiciels RH.", score: 3 },
    ],
  },
  {
    id: "outils_3",
    themeId: "outils_rh",
    question: "Est-ce facile pour les bonnes personnes d’accéder aux informations RH ?",
    options: [
      { label: "Non, trop dispersées.", score: 1 },
      { label: "Assez facile avec de l’aide.", score: 2 },
      { label: "Accès sécurisé via un portail centralisé.", score: 3 },
    ],
  },
  {
    id: "outils_4",
    themeId: "outils_rh",
    question: "Avez-vous automatisé certaines tâches RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Un peu (absences, relevés).", score: 2 },
      { label: "Oui, plusieurs processus automatisés.", score: 3 },
    ],
  },

  // -----------------------------
  // 3. PROCESSUS RH
  // -----------------------------
  {
    id: "processus_1",
    themeId: "processus_rh",
    question: "Avez-vous encore beaucoup de tâches RH faites à la main ?",
    options: [
      { label: "Oui, presque tout.", score: 1 },
      { label: "En partie automatisé.", score: 2 },
      { label: "La majorité est gérée par des processus numériques.", score: 3 },
    ],
  },
  {
    id: "processus_2",
    themeId: "processus_rh",
    question: "Avez-vous mis en place des circuits ou approbations automatiques ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Quelques démarches.", score: 2 },
      { label: "Plusieurs démarches automatisées.", score: 3 },
    ],
  },
  {
    id: "processus_3",
    themeId: "processus_rh",
    question: "Vos procédures RH sont-elles documentées ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "De façon informelle.", score: 2 },
      { label: "Oui, claires et accessibles.", score: 3 },
    ],
  },
  {
    id: "processus_4",
    themeId: "processus_rh",
    question: "Utilisez-vous des rappels automatiques pour les suivis RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Alertes manuelles.", score: 2 },
      { label: "Rappels intégrés aux outils.", score: 3 },
    ],
  },

  // -----------------------------
  // 4. DONNÉES RH & SUIVI
  // -----------------------------
  {
    id: "donnees_1",
    themeId: "donnees_rh",
    question: "Disposez-vous d’un système pour centraliser vos données RH ?",
    options: [
      { label: "Non ou dispersées.", score: 1 },
      { label: "Centralisation en cours.", score: 2 },
      { label: "Oui, solution unique sécurisée.", score: 3 },
    ],
  },
  {
    id: "donnees_2",
    themeId: "donnees_rh",
    question: "Suivez-vous des indicateurs RH utiles ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Quelques indicateurs manuels.", score: 2 },
      { label: "Oui, tableaux de bord à jour.", score: 3 },
    ],
  },
  {
    id: "donnees_3",
    themeId: "donnees_rh",
    question: "Les gestionnaires ont-ils accès à ces indicateurs ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Sur demande.", score: 2 },
      { label: "Accès direct sécurisé.", score: 3 },
    ],
  },
  {
    id: "donnees_4",
    themeId: "donnees_rh",
    question: "Pouvez-vous faire des analyses RH prévisionnelles ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "En réflexion.", score: 2 },
      { label: "Oui, début d’analyses prévisionnelles.", score: 3 },
    ],
  },

  // -----------------------------
  // 5. EXPÉRIENCE EMPLOYÉ
  // -----------------------------
  {
    id: "exp_1",
    themeId: "experience_employe",
    question: "Vos employés peuvent-ils gérer eux-mêmes certaines démarches RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Quelques démarches.", score: 2 },
      { label: "Oui, portail ou application.", score: 3 },
    ],
  },
  {
    id: "exp_2",
    themeId: "experience_employe",
    question: "Avez-vous une plateforme RH conviviale ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Interface minimale.", score: 2 },
      { label: "Interface agréable et adaptée.", score: 3 },
    ],
  },
  {
    id: "exp_3",
    themeId: "experience_employe",
    question: "Sollicitez-vous l’avis des employés sur vos outils RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "À l’occasion.", score: 2 },
      { label: "Oui, retours intégrés.", score: 3 },
    ],
  },
  {
    id: "exp_4",
    themeId: "experience_employe",
    question: "Favorisez-vous l’autonomie RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Très partiellement.", score: 2 },
      { label: "Oui, pratique courante.", score: 3 },
    ],
  },

  // -----------------------------
  // 6. COMPÉTENCES & CULTURE
  // -----------------------------
  {
    id: "comp_1",
    themeId: "competences_culture",
    question: "Vos employés RH sont-ils à l’aise avec les outils numériques ?",
    options: [
      { label: "Peu ou pas.", score: 1 },
      { label: "Acceptable, besoin de soutien.", score: 2 },
      { label: "Oui, compétents et formés.", score: 3 },
    ],
  },
  {
    id: "comp_2",
    themeId: "competences_culture",
    question: "Offrez-vous des formations continues sur le numérique RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Ponctuellement.", score: 2 },
      { label: "Oui, intégrées au plan RH.", score: 3 },
    ],
  },
  {
    id: "comp_3",
    themeId: "competences_culture",
    question: "Utilisez-vous des outils collaboratifs ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Parfois.", score: 2 },
      { label: "Oui, régulièrement.", score: 3 },
    ],
  },
  {
    id: "comp_4",
    themeId: "competences_culture",
    question: "Encouragez-vous l’amélioration continue en RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Occasionnellement.", score: 2 },
      { label: "Oui, démarche structurée.", score: 3 },
    ],
  },

  // -----------------------------
  // 7. SÉCURITÉ & LOI 25
  // -----------------------------
  {
    id: "secu_1",
    themeId: "securite_loi25",
    question: "Vos données RH sont-elles protégées selon les lois du Québec ?",
    options: [
      { label: "Non / Je ne sais pas.", score: 1 },
      { label: "Partiellement.", score: 2 },
      { label: "Oui, conformité active.", score: 3 },
    ],
  },
  {
    id: "secu_2",
    themeId: "securite_loi25",
    question: "Avez-vous désigné une personne responsable de la vie privée ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Pas formellement.", score: 2 },
      { label: "Oui, un responsable déclaré.", score: 3 },
    ],
  },
  {
    id: "secu_3",
    themeId: "securite_loi25",
    question: "Faites-vous des vérifications de sécurité sur vos systèmes RH ?",
    options: [
      { label: "Jamais.", score: 1 },
      { label: "De temps en temps.", score: 2 },
      { label: "Oui, régulièrement.", score: 3 },
    ],
  },
  {
    id: "secu_4",
    themeId: "securite_loi25",
    question: "Disposez-vous d’un plan en cas de fuite ou cyberattaque ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "En réflexion.", score: 2 },
      { label: "Oui, plan d’urgence établi.", score: 3 },
    ],
  },

  // -----------------------------
  // 8. COLLABORATION & CHANGEMENT
  // -----------------------------
  {
    id: "collab_1",
    themeId: "collaboration_changement",
    question: "RH travaille-t-elle avec les autres services pour les projets numériques ?",
    options: [
      { label: "Rarement.", score: 1 },
      { label: "Parfois.", score: 2 },
      { label: "Oui, collaboration étroite.", score: 3 },
    ],
  },
  {
    id: "collab_2",
    themeId: "collaboration_changement",
    question: "Planifiez-vous des actions pour accompagner vos équipes dans les changements ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "Parfois.", score: 2 },
      { label: "Accompagnement structuré.", score: 3 },
    ],
  },
  {
    id: "collab_3",
    themeId: "collaboration_changement",
    question: "Communiquez-vous sur les changements RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "De temps en temps.", score: 2 },
      { label: "Plan de communication actif.", score: 3 },
    ],
  },
  {
    id: "collab_4",
    themeId: "collaboration_changement",
    question: "Évaluez-vous l’adhésion et l’utilisation des nouveaux outils RH ?",
    options: [
      { label: "Non.", score: 1 },
      { label: "À vue d’œil.", score: 2 },
      { label: "Données ou sondages.", score: 3 },
    ],
  },
];

// -------------------------------------------------------------
// UNSCORED CONTEXT — personalizes the reading, never the score
// -------------------------------------------------------------

export const contextQuestions = [
  {
    id: "organizationSize" as const,
    label: "Taille de l'organisation",
    question: "Quelle est la taille de votre organisation ?",
    options: [
      "Moins de 50 personnes",
      "50 à 199 personnes",
      "200 à 999 personnes",
      "1 000 personnes et plus",
    ],
  },
  {
    id: "sector" as const,
    label: "Secteur",
    question: "Dans quel environnement évolue votre organisation ?",
    options: [
      "Municipalité ou secteur public",
      "Organisation parapublique ou communautaire",
      "Entreprise privée",
      "Autre",
    ],
  },
  {
    id: "hrTeamSize" as const,
    label: "Équipe RH",
    question: "Quelle est la taille de votre équipe RH ?",
    options: [
      "1 personne ou moins",
      "2 à 5 personnes",
      "6 à 15 personnes",
      "Plus de 15 personnes",
    ],
  },
  {
    id: "primarySirh" as const,
    label: "Environnement SIRH",
    question: "Quel est votre environnement SIRH principal ?",
    options: [
      "Principalement Excel, papier ou courriel",
      "Un ou quelques logiciels RH spécialisés",
      "Une suite SIRH intégrée",
      "Je ne sais pas encore",
    ],
  },
  {
    id: "currentPriority" as const,
    label: "Priorité actuelle",
    question: "Quelle est votre priorité de transformation actuelle ?",
    options: [
      "Clarifier la stratégie et la gouvernance",
      "Choisir ou faire évoluer le SIRH",
      "Fiabiliser les processus et les données",
      "Améliorer l'adoption des outils en place",
    ],
  },
];

export type ContextField = (typeof contextQuestions)[number]["id"];

export type AssessmentContext = {
  organizationSize?: string;
  sector?: string;
  hrTeamSize?: string;
  primarySirh?: string;
  currentPriority?: string;
  marketingConsent?: boolean;
};

export type MaturityLevel = "Starter" | "Optimizer" | "Leader";

export const LEVEL_NAMES: Record<1 | 2 | 3, MaturityLevel> = {
  1: "Starter",
  2: "Optimizer",
  3: "Leader",
};

export function optionLevelLabel(score: number): MaturityLevel {
  if (score >= 3) return LEVEL_NAMES[3];
  if (score === 2) return LEVEL_NAMES[2];
  return LEVEL_NAMES[1];
}

// -------------------------------------------------------------
// SCORING ENGINE
// Bands are frozen. Average = points / number of questions.
// Starter 1.00–1.66, Optimizer 1.67–2.33, Leader 2.34–3.00.
// On 32 questions that is 32–53, 54–74 and 75–96.
// -------------------------------------------------------------

export const CRITICAL_THEME_IDS = [
  "donnees_rh",
  "processus_rh",
  "collaboration_changement",
] as const;

export const MAX_GLOBAL_SCORE = 96;

export function calculateThemeScore(themeId: string, answers: Record<string, number>) {
  const themeQuestions = questions.filter((q) => q.themeId === themeId);
  return themeQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
}

export function calculateGlobalScore(answers: Record<string, number>) {
  return questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
}

export function levelFromAverage(average: number): MaturityLevel {
  if (average < 1.67) return "Starter";
  if (average < 2.34) return "Optimizer";
  return "Leader";
}

export type DimensionScore = {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  questionCount: number;
  average: number;
  level: MaturityLevel;
};

export function getDimensionScores(answers: Record<string, number>): DimensionScore[] {
  return themes.map((theme) => {
    const themeQuestions = questions.filter((q) => q.themeId === theme.id);
    const score = calculateThemeScore(theme.id, answers);
    const questionCount = themeQuestions.length || 1;
    const average = score / questionCount;
    return {
      id: theme.id,
      title: theme.title,
      score,
      maxScore: theme.maxScore,
      questionCount,
      average,
      level: levelFromAverage(average),
    };
  });
}

export function getHROpsProfile(
  score: number,
  dimensions?: DimensionScore[]
): MaturityLevel {
  const questionCount = questions.length || 1;
  const base = levelFromAverage(score / questionCount);
  if (!dimensions || base !== "Leader") return base;

  const criticalStarters = dimensions.filter(
    (dimension) =>
      (CRITICAL_THEME_IDS as readonly string[]).includes(dimension.id) &&
      dimension.level === "Starter"
  ).length;

  return criticalStarters >= 2 ? "Optimizer" : "Leader";
}

export function getMaturityLevel(score: number, dimensions?: DimensionScore[]) {
  return getHROpsProfile(score, dimensions);
}

export function wasLevelCapped(score: number, dimensions: DimensionScore[]) {
  const base = levelFromAverage(score / (questions.length || 1));
  return base === "Leader" && getHROpsProfile(score, dimensions) === "Optimizer";
}

export function formatAverage(average: number) {
  return average.toFixed(2).replace(".", ",");
}

export function sectorVocabulary(sector?: string) {
  const value = (sector || "").toLowerCase();
  if (value.includes("municipal") || value.includes("public")) {
    return "une municipalité ou une organisation du secteur public";
  }
  if (value.includes("parapublic") || value.includes("communaut")) {
    return "une organisation parapublique ou communautaire";
  }
  if (value.includes("priv")) {
    return "une organisation du secteur privé";
  }
  return "votre organisation";
}

const DIMENSION_ACTIONS: Record<
  string,
  { action: string; horizon: string; impact: string }
> = {
  organisation_vision: {
    action:
      "Formaliser une vision partagée de la transformation RH digitale, avec un sponsor, des priorités et un suivi.",
    horizon: "0–6 mois",
    impact: "élevé",
  },
  outils_rh: {
    action:
      "Clarifier la couverture du SIRH et les intégrations utiles avant d'ajouter de nouveaux outils.",
    horizon: "3–9 mois",
    impact: "élevé",
  },
  processus_rh: {
    action:
      "Identifier 3 à 5 processus RH répétitifs et les simplifier avant de les automatiser.",
    horizon: "3–6 mois",
    impact: "moyen à élevé",
  },
  donnees_rh: {
    action:
      "Consolider la qualité et la gouvernance des données RH avant d'élargir les usages analytiques ou IA.",
    horizon: "0–3 mois",
    impact: "élevé",
  },
  experience_employe: {
    action:
      "Simplifier l'accès aux services RH pour les employés et les gestionnaires, à partir des irritants déjà connus.",
    horizon: "0–6 mois",
    impact: "élevé",
  },
  competences_culture: {
    action:
      "Renforcer la capacité de l'équipe RH à utiliser les outils et les données déjà en place.",
    horizon: "0–6 mois",
    impact: "moyen à élevé",
  },
  securite_loi25: {
    action:
      "Revoir les accès et les pratiques de protection des renseignements RH. Ce point mérite d'être approfondi; il ne constitue pas un audit de cybersécurité.",
    horizon: "0–3 mois",
    impact: "élevé",
  },
  collaboration_changement: {
    action:
      "Structurer l'accompagnement des gestionnaires et mesurer l'adoption des outils déjà déployés.",
    horizon: "0–6 mois",
    impact: "élevé",
  },
};

export type Priority = DimensionScore & {
  action: string;
  horizon: string;
  impact: string;
};

export function selectPriorities(dimensions: DimensionScore[], count = 3): Priority[] {
  return [...dimensions]
    .sort((a, b) => a.average - b.average || a.score - b.score)
    .slice(0, count)
    .map((dimension) => ({
      ...dimension,
      ...(DIMENSION_ACTIONS[dimension.id] ?? {
        action: "Approfondir cette dimension avant de lancer un nouveau chantier.",
        horizon: "0–6 mois",
        impact: "à préciser",
      }),
    }));
}

export function levelReading(level: MaturityLevel, sector?: string) {
  const who = sectorVocabulary(sector);
  if (level === "Leader") {
    return `Les réponses décrivent ${who} qui dispose déjà de pratiques relativement structurées sur plusieurs dimensions. La maturité peut tout de même rester inégale. Le prochain levier consiste souvent à consolider la cohérence entre la stratégie, les données, les processus et l'adoption, plutôt qu'à ajouter des outils.`;
  }
  if (level === "Optimizer") {
    return `Les réponses décrivent ${who} qui dispose déjà de plusieurs fondations. Certaines pratiques sont structurées, mais la maturité demeure inégale selon les dimensions. Le prochain levier n'est pas nécessairement d'ajouter de nouveaux outils. Il consiste d'abord à consolider les processus, les données, la gouvernance et l'adoption afin de tirer davantage de valeur de l'écosystème existant.`;
  }
  return `Les réponses décrivent ${who} où plusieurs fondations de la transformation RH digitale restent à structurer. Ce résultat est une première lecture, pas un jugement sur les équipes. Le prochain pas utile est de choisir peu de chantiers, dans un ordre réaliste.`;
}

export function buildDeterministicAnalysis(input: {
  totalScore: number;
  level: MaturityLevel;
  dimensions: DimensionScore[];
  context?: AssessmentContext;
  capped?: boolean;
}) {
  const average = input.totalScore / (questions.length || 1);
  const strengths = input.dimensions.filter((dimension) => dimension.average >= 2);
  const gaps = input.dimensions.filter((dimension) => dimension.level === "Starter");
  const priorities = selectPriorities(input.dimensions);
  const who = sectorVocabulary(input.context?.sector);

  const strengthLines = strengths.length
    ? strengths
        .map(
          (dimension) =>
            `- ${dimension.title} (${dimension.score}/${dimension.maxScore}, niveau ${dimension.level}). Les réponses de cette dimension se situent au moins au niveau Optimizer.`
        )
        .join("\n")
    : "- Aucune dimension n'atteint encore le seuil Optimizer. Le profil reste à structurer; cela ne signifie pas une absence totale de pratiques.";

  const gapLines = gaps.length
    ? gaps
        .map(
          (dimension) =>
            `- ${dimension.title} (${dimension.score}/${dimension.maxScore}). Cette zone de progression est directement liée au score de la dimension.`
        )
        .join("\n")
    : "- Aucune dimension n'est au niveau Starter. Les écarts, s'il y en a, sont relatifs entre des dimensions déjà engagées.";

  const priorityLines = priorities
    .map(
      (priority, index) =>
        `${index + 1}. ${priority.title} — ${priority.action}\nHorizon : ${priority.horizon} | Impact : ${priority.impact}`
    )
    .join("\n\n");

  const capNote = input.capped
    ? "\n\nLe score global se situe dans la zone Leader, mais au moins deux dimensions critiques (données, processus ou adoption) sont au niveau Starter. Le niveau affiché est donc Optimizer, afin de ne pas présenter une maturité homogène."
    : "";

  return `Résumé
${levelReading(input.level, input.context?.sector)}

Score global : ${input.totalScore}/96. Moyenne : ${formatAverage(average)}/3. Niveau : ${input.level}.${capNote}

Cette lecture concerne ${who}. Il s'agit d'une autoévaluation indicative, et non d'un audit.

Forces liées aux dimensions
${strengthLines}

Zones de progression
${gapLines}

Trois priorités
${priorityLines}

Opportunités
Les usages numériques ou d'IA les plus utiles dépendent d'abord des dimensions les moins matures. Ils méritent d'être approfondis en session, à partir du contexte déclaré${
    input.context?.currentPriority
      ? ` (priorité indiquée : ${input.context.currentPriority})`
      : ""
  }.

Risques potentiels
Si les zones de progression restent sans suite, l'organisation pourrait continuer à investir dans des outils dont les processus, les données ou l'adoption limitent la valeur. Ce risque est potentiel; il n'est pas une conséquence mesurée.`;
}

export function answerLines(answers: Record<string, number>) {
  return questions
    .map((question) => {
      const score = answers[question.id];
      const option = question.options.find((item) => item.score === score);
      return `- ${question.question} → ${option ? `${optionLevelLabel(option.score)} — ${option.label}` : "sans réponse"}`;
    })
    .join("\n");
}

export default {
  themes,
  questions,
  contextQuestions,
  calculateThemeScore,
  calculateGlobalScore,
  getMaturityLevel,
  getHROpsProfile,
};
