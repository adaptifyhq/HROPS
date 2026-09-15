import { NextResponse } from "next/server";
import { listAssessments } from "@/lib/assessments";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const assessments = await listAssessments();
    return NextResponse.json({ assessments });
  } catch (error) {
    console.error("Admin assessments error:", error);
    return NextResponse.json({ error: "Failed to load assessments" }, { status: 500 });
  }
}
