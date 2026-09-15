import { desc, eq } from "drizzle-orm";
import slugify from "slugify";
import { getDb, isUuid } from "@/lib/db";
import { blogs } from "@/lib/schema";

type BlogRow = typeof blogs.$inferSelect;

export function serializeBlog(row: BlogRow) {
  return {
    ...row,
    _id: row.id,
    imageBase64: row.thumbnail ?? undefined,
    authorImage: row.authorImage ?? "",
    content: row.content ?? "",
    toc: row.toc ?? [],
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function makeSlug(title: string) {
  const base =
    slugify(title, { lower: true, strict: true, trim: true }) || "article";
  return `${base}-${Date.now()}`;
}

export async function createBlog(input: {
  title: string;
  description: string;
  content?: string;
  author: string;
  thumbnail?: string;
  toc?: string[];
}) {
  const db = getDb();
  const [row] = await db
    .insert(blogs)
    .values({
      title: input.title,
      slug: makeSlug(input.title),
      description: input.description,
      content: input.content ?? "",
      author: input.author,
      thumbnail: input.thumbnail ?? "",
      toc: input.toc ?? [],
    })
    .returning();

  return serializeBlog(row);
}

export async function listBlogs() {
  const db = getDb();
  const rows = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
  return rows.map(serializeBlog);
}

export async function findBlogById(id: string) {
  if (!isUuid(id)) return null;
  const db = getDb();
  const [row] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  return row ? serializeBlog(row) : null;
}

export async function deleteBlogById(id: string) {
  if (!isUuid(id)) return null;
  const db = getDb();
  const [row] = await db.delete(blogs).where(eq(blogs.id, id)).returning();
  return row ? serializeBlog(row) : null;
}

export async function updateBlogById(
  id: string,
  input: {
    title: string;
    author: string;
    description: string;
    content?: string;
    toc?: string[];
    thumbnail?: string;
  }
) {
  if (!isUuid(id)) return null;
  const db = getDb();
  const [row] = await db
    .update(blogs)
    .set({
      title: input.title,
      author: input.author,
      description: input.description,
      content: input.content ?? "",
      toc: input.toc ?? [],
      ...(input.thumbnail !== undefined ? { thumbnail: input.thumbnail } : {}),
      updatedAt: new Date(),
    })
    .where(eq(blogs.id, id))
    .returning();

  return row ? serializeBlog(row) : null;
}
