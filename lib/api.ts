// lib/api.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchNotes(userId: string): Promise<any[]> {
    const res = await fetch(`/api/notes/get?userId=${userId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch notes");
    const { notes } = await res.json();
    return notes;
  }
  
  export async function deleteNote(id: string): Promise<void> {
    const res = await fetch(`/api/notes/delete/${id}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to delete note");
  }
  
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

  export async function fetchNoteById(id: string): Promise<any> {
    const res = await fetch(`/api/notes/get/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch note");
    const { note } = await res.json();
    return note;
  }
  
  

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
  