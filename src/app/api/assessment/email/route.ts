import { NextResponse } from "next/server";
import { Resend } from "resend";
import { findAssessmentById } from "@/lib/assessments";

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { assessmentId, pdfBase64 } = await req.json();

    if (!assessmentId || !pdfBase64) {
      return NextResponse.json(
        { error: "Missing assessmentId or PDF" },
        { status: 400 }
      );
    }

    const assessment = await findAssessmentById(assessmentId);

    if (!assessment) {
      return NextResponse.json(
        { error: "Assessment not found" },
        { status: 404 }
      );
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: assessment.email,
      subject: "Votre rapport – Diagnostic RH Digital",
      html: `
        <p>Bonjour ${assessment.contactName},</p>
        <p>Voici votre rapport complet concernant votre diagnostic de maturité RH digitale.</p>
        <p>Nous restons disponibles pour une session d'interprétation de vos résultats.</p>
        <br />
        <p>HROps Consulting Inc.</p>
      `,
      attachments: [
        {
          filename: "Diagnostic_HROps.pdf",
          content: pdfBuffer,
        },
      ],
    });

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO_ADMIN!,
      subject: "🆕 Nouveau Diagnostic RH complété",
      html: `
        <h2>Nouveau Diagnostic Complété</h2>
        <p><strong>Entreprise :</strong> ${assessment.companyName}</p>
        <p><strong>Contact :</strong> ${assessment.contactName}</p>
        <p><strong>Email :</strong> ${assessment.email}</p>
        <p><strong>Niveau :</strong> ${assessment.maturityLevel}</p>
        <hr />
        <p>PDF du rapport est attaché.</p>
      `,
      attachments: [
        {
          filename: "Rapport_Client.pdf",
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }
}
