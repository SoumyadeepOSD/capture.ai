/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchNoteById, updateNote } from "@/lib/api";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, error }: any = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      router.push("/home"); // or wherever
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ✅ set initial form values after note is loaded
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load note.</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ id, title, content });
  };

  return (
    <main className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">Edit Note</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-3 rounded"
        />

        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Updating..." : "Update Note"}
        </button>
      </form>
    </main>
  );
}
