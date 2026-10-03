import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { findAssessmentById } from "@/lib/assessments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { assessmentId } = await req.json();
    if (!assessmentId)
      return NextResponse.json({ error: "Missing assessmentId" }, { status: 400 });

    const assessment = await findAssessmentById(assessmentId);
    if (!assessment)
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });

    const origin = new URL(req.url).origin;
    const templateUrl = `${origin}/pdf-templates/assessment?assessmentId=${assessmentId}`;

    const isLocal = !process.env.VERCEL;

    const browser = isLocal
      ? await (await import("puppeteer")).launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        })
      : await puppeteer.launch({
          args: chromium.args,
          executablePath: await chromium.executablePath(),
          headless: true,
        });

    const page = await browser.newPage();
    await page.goto(templateUrl, { waitUntil: "networkidle0", timeout: 60000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size:8px;font-family:Helvetica,Arial,sans-serif;color:#8a8178;width:100%;padding:0 16mm;display:flex;justify-content:space-between;">
          <span>HROps Consulting Inc.</span>
          <span>Diagnostic de maturité digitale RH</span>
        </div>`,
      footerTemplate: `
        <div style="font-size:8px;font-family:Helvetica,Arial,sans-serif;color:#8a8178;width:100%;padding:0 16mm;display:flex;justify-content:space-between;">
          <span>Confidentiel · autoévaluation indicative</span>
          <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
        </div>`,
      margin: { top: "16mm", bottom: "14mm", left: "16mm", right: "16mm" },
    });

    await browser.close();

    return new Response(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Diagnostic_HROps.pdf"',
      },
    });
  } catch (error: unknown) {
    console.error("PDF generation error:", error);
    const message = error instanceof Error ? error.message : undefined;
    return NextResponse.json(
      { error: "Internal PDF generation error", details: message },
      { status: 500 }
    );
  }
}
