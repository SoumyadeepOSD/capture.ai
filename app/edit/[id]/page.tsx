import { createClient } from "@/utils/supabase/server";
import { editNote } from "./action";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");
  const noteId = await params?.id;

  if (!noteId) {
    return <p className="text-center">Invalid note ID.</p>;
  }

  const { data: note, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .eq("user_id", user.id)
    .single();

  if (!note || error) {
    return <p className="text-center">Note not found or not authorized.</p>;
  }

  return (
    <main className="max-w-md mx-auto py-10 px-4">
      <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
      <form action={editNote} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={note.id} />
        <input
          type="text"
          name="title"
          defaultValue={note.title}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="content"
          defaultValue={note.content}
          required
          rows={6}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Update Note
        </button>
      </form>
    </main>
  );
}
