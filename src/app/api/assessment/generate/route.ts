import { NextResponse } from "next/server";
import {
  answerLines,
  type AssessmentContext,
  buildDeterministicAnalysis,
  calculateGlobalScore,
  formatAverage,
  getDimensionScores,
  getHROpsProfile,
  questions,
  sectorVocabulary,
  wasLevelCapped,
} from "@/lib/assessment";
import { createAssessment } from "@/lib/assessments";

export const dynamic = "force-dynamic";

function isContext(value: unknown): value is AssessmentContext {
  return !!value && typeof value === "object";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers, companyName, contactName, email, context } = body;

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid answers" },
        { status: 400 }
      );
    }

    const safeAnswers: Record<string, number> = {};
    for (const question of questions) {
      const score = answers[question.id];
      if (score === 1 || score === 2 || score === 3) {
        safeAnswers[question.id] = score;
      }
    }

    const safeContext: AssessmentContext = isContext(context)
      ? {
          organizationSize:
            typeof context.organizationSize === "string"
              ? context.organizationSize
              : "",
          sector: typeof context.sector === "string" ? context.sector : "",
          hrTeamSize:
            typeof context.hrTeamSize === "string" ? context.hrTeamSize : "",
          primarySirh:
            typeof context.primarySirh === "string" ? context.primarySirh : "",
          currentPriority:
            typeof context.currentPriority === "string"
              ? context.currentPriority
              : "",
          marketingConsent: context.marketingConsent === true,
        }
      : {};

    const totalScore = calculateGlobalScore(safeAnswers);
    const dimensions = getDimensionScores(safeAnswers);
    const maturityLevel = getHROpsProfile(totalScore, dimensions);
    const capped = wasLevelCapped(totalScore, dimensions);
    const fallback = buildDeterministicAnalysis({
      totalScore,
      level: maturityLevel,
      dimensions,
      context: safeContext,
      capped,
    });

    let aiAnalysis = fallback;

    if (process.env.OPENROUTER_API_KEY) {
      const dimensionLines = dimensions
        .map(
          (dimension) =>
            `- ${dimension.title}: ${dimension.score}/${dimension.maxScore} (moyenne ${formatAverage(dimension.average)}/3, niveau ${dimension.level})`
        )
        .join("\n");

      const prompt = `
Tu rédiges une lecture personnalisée d'une autoévaluation de maturité digitale RH.
Tu n'es pas la méthode de mesure. Le score et le niveau ci-dessous sont définitifs. Tu ne les recalcules pas et tu ne les changes pas.

Organisation : ${sectorVocabulary(safeContext.sector)}
Taille : ${safeContext.organizationSize || "non précisée"}
Équipe RH : ${safeContext.hrTeamSize || "non précisée"}
SIRH principal : ${safeContext.primarySirh || "non précisé"}
Priorité déclarée : ${safeContext.currentPriority || "non précisée"}

Score global figé : ${totalScore}/96
Moyenne figée : ${formatAverage(totalScore / 32)}/3
Niveau figé : ${maturityLevel}
${capped ? "Le niveau a été plafonné à Optimizer parce qu'au moins deux dimensions critiques (données, processus, adoption) sont Starter. Ne présente pas l'organisation comme Leader." : ""}

Scores par dimension :
${dimensionLines}

Réponses :
${answerLines(safeAnswers)}

Rédige en français, avec ces sections exactement :
Résumé
Forces liées aux dimensions
Zones de progression
Trois priorités
Opportunités
Risques potentiels

Règles :
- Chaque force ou zone doit citer la dimension et rester compatible avec son score.
- N'affirme pas une force si la dimension est Starter.
- Les trois priorités partent des dimensions les moins matures. Indique un horizon et un impact.
- Risques au conditionnel seulement : « pourrait », « risque potentiel », « mérite d'être approfondi ».
- Interdit : absentéisme, roulement, leadership reconnu, capacité éprouvée, faible investissement certain, et le mot PME sauf si le secteur déclaré est explicitement une PME, ce qui n'est pas le cas ici.
- Adapte le vocabulaire à ${sectorVocabulary(safeContext.sector)}. N'emploie pas « PME » par défaut.
- Rappelle que c'est une autoévaluation indicative, pas un audit.
      `.trim();

      try {
        const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-4.1-mini",
            messages: [
              {
                role: "system",
                content:
                  "Tu expliques un diagnostic déjà calculé. Tu ne modifies jamais le score ni le niveau fournis.",
              },
              { role: "user", content: prompt },
            ],
          }),
        });

        const aiData = await aiRes.json();
        const content = aiData?.choices?.[0]?.message?.content;
        if (typeof content === "string" && content.trim()) {
          aiAnalysis = content.trim();
        }
      } catch (err) {
        console.error("OpenRouter error:", err);
        aiAnalysis = fallback;
      }
    }

    const saved = await createAssessment({
      companyName,
      contactName,
      email,
      answers: safeAnswers,
      context: safeContext,
      totalScore,
      maturityLevel,
      aiAnalysis,
    });

    return NextResponse.json({
      assessment: {
        _id: saved._id,
        email: saved.email,
        contactName: saved.contactName,
        companyName: saved.companyName,
        answers: saved.answers,
        context: saved.context,
        totalScore: saved.totalScore,
        maturityLevel: saved.maturityLevel,
        aiAnalysis: saved.aiAnalysis,
        createdAt: saved.createdAt,
      },
    });
  } catch (err) {
    console.error("Assessment API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
