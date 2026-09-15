import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content"),
  author: text("author").notNull(),
  authorImage: text("author_image"),
  thumbnail: text("thumbnail"),
  toc: text("toc").array(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyName: text("company_name").default(""),
  contactName: text("contact_name").default(""),
  email: text("email").default(""),
  answers: jsonb("answers").$type<Record<string, number>>().notNull(),
  totalScore: integer("total_score").notNull(),
  maturityLevel: text("maturity_level").notNull(),
  aiAnalysis: text("ai_analysis").notNull(),
  pdfUrl: text("pdf_url").default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
