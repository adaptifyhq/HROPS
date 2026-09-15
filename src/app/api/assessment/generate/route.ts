import { NextResponse } from "next/server";
import { questions } from "@/lib/assessment";
import { createAssessment } from "@/lib/assessments";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers, companyName, contactName, email } = body;

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid answers" },
        { status: 400 }
      );
    }

    let totalScore = 0;

    for (const q of questions) {
      const score = answers[q.id];
      if (typeof score === "number") {
        totalScore += score;
      }
    }

    let maturityLevel = "Starter";

    if (totalScore >= 65) maturityLevel = "Leader";
    else if (totalScore >= 40) maturityLevel = "Optimizer";
    else maturityLevel = "Starter";

    const prompt = `
Tu es un expert RH du Québec spécialisé en transformation numérique.

Score total : ${totalScore}/96
Niveau : ${maturityLevel}

Analyse en français :
- Résumé clair (10 lignes)
- Forces principales
- Faiblesses
- Priorités immédiates (3-5)
- Opportunités long terme
- Risques RH si rien n'est fait

Ton professionnel adapté aux PME québécoises.
    `.trim();

    let aiAnalysis = "Analyse IA non générée (clé OpenRouter manquante).";

    if (process.env.OPENROUTER_API_KEY) {
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
              { role: "system", content: "Tu es un expert RH du Québec." },
              { role: "user", content: prompt },
            ],
          }),
        });

        const aiData = await aiRes.json();
        aiAnalysis =
          aiData?.choices?.[0]?.message?.content ||
          "Analyse IA non disponible.";
      } catch (err) {
        console.error("OpenRouter error:", err);
        aiAnalysis = "Analyse IA indisponible pour le moment.";
      }
    }

    const saved = await createAssessment({
      companyName,
      contactName,
      email,
      answers,
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
