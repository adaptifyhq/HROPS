import { desc, eq } from "drizzle-orm";
import { getDb, isUuid } from "@/lib/db";
import { assessments } from "@/lib/schema";

type AssessmentRow = typeof assessments.$inferSelect;

export function serializeAssessment(row: AssessmentRow) {
  return {
    ...row,
    _id: row.id,
    companyName: row.companyName ?? "",
    contactName: row.contactName ?? "",
    email: row.email ?? "",
    pdfUrl: row.pdfUrl ?? "",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function createAssessment(input: {
  companyName?: string;
  contactName?: string;
  email?: string;
  answers: Record<string, number>;
  totalScore: number;
  maturityLevel: string;
  aiAnalysis: string;
}) {
  const db = getDb();
  const [row] = await db
    .insert(assessments)
    .values({
      companyName: input.companyName ?? "",
      contactName: input.contactName ?? "",
      email: input.email ?? "",
      answers: input.answers,
      totalScore: input.totalScore,
      maturityLevel: input.maturityLevel,
      aiAnalysis: input.aiAnalysis,
    })
    .returning();

  return serializeAssessment(row);
}

export async function listAssessments() {
  const db = getDb();
  const rows = await db
    .select()
    .from(assessments)
    .orderBy(desc(assessments.createdAt));
  return rows.map(serializeAssessment);
}

export async function findAssessmentById(id: string) {
  if (!isUuid(id)) return null;
  const db = getDb();
  const [row] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, id))
    .limit(1);
  return row ? serializeAssessment(row) : null;
}
