"use client";

import { useTransition } from "react";
import { addNote } from "./action";

export default function CreateNotePage() {
  const [isPending, startTransition] = useTransition();

  const handleForm = (formData: FormData) => {
    startTransition(() => {
      addNote(formData);
    });
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-xl font-bold mb-4">Create a New Note</h1>

      <form action={handleForm} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Write your note here..."
          required
          rows={6}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Note"}
        </button>
      </form>

      {isPending && (
        <p className="mt-2 text-sm text-gray-500 animate-pulse">Creating note...</p>
      )}
    </div>
  );
}
