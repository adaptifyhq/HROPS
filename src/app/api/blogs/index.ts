import { NextResponse } from "next/server";
import { listBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blogs = await listBlogs();
    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
