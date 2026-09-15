"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleForm } from "@/components/admin/ArticleForm";

type BlogData = {
  title: string;
  author: string;
  description: string;
  content: string;
  toc?: string[];
  thumbnail?: string;
};

export default function AdminEdit() {
  const params = useParams();
  const id = params?.id?.toString();
  const router = useRouter();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.title) throw new Error();
        setBlog(data);
      })
      .catch(() => toast.error("Impossible de charger l’article."))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminShell>
      {loading ? (
        <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
          Chargement…
        </div>
      ) : !blog ? (
        <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
          Article introuvable.
        </div>
      ) : (
        <ArticleForm
          mode="edit"
          submitting={submitting}
          initial={blog}
          onSubmit={async (values) => {
            setSubmitting(true);
            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("author", values.author);
              formData.append("description", values.description);
              formData.append("content", values.content);
              formData.append("toc", JSON.stringify(values.toc));
              if (values.imageFile) formData.append("image", values.imageFile);
              if (values.removeCover) formData.append("removeCover", "true");

              const res = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                body: formData,
              });

              if (!res.ok) throw new Error();
              toast.success("Article enregistré");
              router.push("/admin");
            } catch {
              toast.error("La mise à jour a échoué");
            } finally {
              setSubmitting(false);
            }
          }}
        />
      )}
    </AdminShell>
  );
}
