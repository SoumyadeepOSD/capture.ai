// lib/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */


// !Get all notes of a particular user
export async function fetchNotes(userId: string, keyword?: string): Promise<any[]> {
  const queryParams = new URLSearchParams({ userId });

  if (keyword) {
    queryParams.append("keyword", keyword);
  }

  const res = await fetch(`/api/notes/get?${queryParams.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");

  const { notes } = await res.json();
  return notes;
}



// !Delete Note
export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`/api/notes/delete/${id}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}


// !Create New Note
export async function createNote(title: string, content: string): Promise<void> {
  const res = await fetch("/api/notes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create note");
  }
}


// !Get info of particulat note from the noteId
export async function fetchNoteById(id: string): Promise<any> {
  const res = await fetch(`/api/notes/get/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch note");
  const { note } = await res.json();
  return note;
}



// !Update note
export async function updateNote({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}): Promise<void> {
  const res = await fetch(`/api/notes/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to update note");
  }
}


// !Summerize the text
export async function summarizeNote(content: string): Promise<string> {
  const res = await fetch("/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to summarize note");
  }

  const { summary } = await res.json();
  return summary;
}