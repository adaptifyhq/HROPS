"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function AdminCreate() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  return (
    <AdminShell>
      <ArticleForm
        mode="create"
        submitting={submitting}
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

            const res = await fetch("/api/blogs", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              throw new Error(data.error || "Publication impossible");
            }

            toast.success("Article publié");
            router.push("/admin");
          } catch (err) {
            toast.error(
              err instanceof Error ? err.message : "Erreur serveur"
            );
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </AdminShell>
  );
}
