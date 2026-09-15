import { NextResponse } from "next/server";
import { createBlog, listBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const tocRaw = formData.get("toc") as string;
    const image = formData.get("image") as File;

    if (!title?.trim() || !description?.trim() || !author?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let toc: string[] = [];
    try {
      toc = tocRaw ? JSON.parse(tocRaw) : [];
    } catch {
      toc = [];
    }

    let thumbnail = "";
    if (image && typeof image === "object" && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      thumbnail = `data:${image.type};base64,${buffer.toString("base64")}`;
    }

    const blog = await createBlog({
      title,
      description,
      content,
      author,
      thumbnail,
      toc,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err: unknown) {
    console.error("POST error:", err);
    const message = err instanceof Error ? err.message : "Failed to create blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await listBlogs();
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
