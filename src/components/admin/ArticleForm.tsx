"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { SimpleEditor } from "@/components/tiptap/simple-editor";

export type ArticleValues = {
  title: string;
  author: string;
  description: string;
  content: string;
  toc: string[];
  imageFile: File | null;
  removeCover: boolean;
};

type ArticleFormProps = {
  mode: "create" | "edit";
  initial?: {
    title?: string;
    author?: string;
    description?: string;
    content?: string;
    toc?: string[];
    thumbnail?: string;
  };
  submitting?: boolean;
  onSubmit: (values: ArticleValues) => Promise<void>;
};

const fieldClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-neutral-500";

export function ArticleForm({
  mode,
  initial,
  submitting = false,
  onSubmit,
}: ArticleFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "Fayçal Khadad");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [tocText, setTocText] = useState((initial?.toc ?? []).join("\n"));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initial?.thumbnail ?? "");
  const [removeCover, setRemoveCover] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Le titre est requis.");
      return;
    }

    await onSubmit({
      title: title.trim(),
      author: author.trim() || "Fayçal Khadad",
      description: description.trim() || title.trim(),
      content,
      toc: tocText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      imageFile,
      removeCover,
    });
  }

  function addCover(file: File) {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setRemoveCover(false);
  }

  function deleteCover() {
    setImageFile(null);
    setPreview("");
    setRemoveCover(true);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-0 flex-1 flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <Link
          href="/admin"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        >
          ← Articles
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {submitting ? "Enregistrement…" : mode === "create" ? "Publier" : "Enregistrer"}
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <SimpleEditor
          content={content}
          onChange={setContent}
          header={
            <div className="mb-6 space-y-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) addCover(file);
                }}
              />

              {preview ? (
                <div className="overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="" className="h-52 w-full object-cover" />
                  <div className="flex gap-2 border-t border-neutral-200 p-2 dark:border-neutral-800">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm dark:border-neutral-700"
                    >
                      Changer
                    </button>
                    <button
                      type="button"
                      onClick={deleteCover}
                      className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 dark:border-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full rounded-lg border border-dashed border-neutral-300 px-3 py-8 text-sm text-neutral-500 dark:border-neutral-700"
                >
                  Ajouter une image de couverture
                </button>
              )}

              <label className="block">
                <span className="mb-1.5 block text-sm text-neutral-500">Titre</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titre de l’article"
                  className={`${fieldClass} text-lg`}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-neutral-500">Résumé</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Court résumé (optionnel)"
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm text-neutral-500">Auteur</span>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>
          }
        />
      </div>
    </form>
  );
}
