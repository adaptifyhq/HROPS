import { notFound } from "next/navigation";
import { findBlogById } from "@/lib/blogs";
import { BlogContentWithToc } from "./BlogContentWithToc";

export const dynamic = "force-dynamic";

export default async function BlogPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const blog = await findBlogById(slug);

  if (!blog) return notFound();

  return <BlogContentWithToc blog={JSON.parse(JSON.stringify(blog))} />;
}
