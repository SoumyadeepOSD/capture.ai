"use client";

import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createNote(title, content),
    onSuccess: () => {
      router.push("/home");
    },
  });

  const handleForm = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    mutate({ title, content });
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

      {isPending && <p className="mt-2 text-sm text-gray-500 animate-pulse">Creating note...</p>}
      {isSuccess && <p className="mt-2 text-sm text-green-600">Note created successfully!</p>}
      {isError && <p className="mt-2 text-sm text-red-600">{(error as Error).message}</p>}
    </div>
  );
}
