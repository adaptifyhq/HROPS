import { NextRequest, NextResponse } from "next/server";
import {
  deleteBlogById,
  findBlogById,
  updateBlogById,
} from "@/lib/blogs";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const blog = await findBlogById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = await deleteBlogById(id);
    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;
    const tocRaw = formData.get("toc") as string;
    const removeCover = formData.get("removeCover") === "true";

    let toc: string[] = [];
    try {
      toc = JSON.parse(tocRaw);
    } catch {
      console.warn("Invalid TOC JSON:", tocRaw);
    }

    let thumbnail: string | undefined;
    if (removeCover) {
      thumbnail = "";
    } else if (file && typeof file === "object" && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      thumbnail = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const updated = await updateBlogById(id, {
      title,
      author,
      description,
      content,
      toc,
      thumbnail,
    });

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT blog error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}
