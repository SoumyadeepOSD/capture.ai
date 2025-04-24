/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Pen } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  const fetchNotes = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    setNotes(data || []);
    setFilteredNotes(data || []);
  };


  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [query, notes]);

  const deleteNote = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
  
    const res = await fetch(`/api/notes/delete/${id}`, {
      method: "POST",
    });
  
    if (res.ok) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } else {
      alert("Failed to delete note.");
    }
  };
  

  return (
    <main className="min-h-screen w-full bg-muted py-10 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your Notes 📝</h1>
          <Link href="/create">
            <Button variant="default">+ New Note</Button>
          </Link>
        </div>

        <Input
          type="text"
          placeholder="Search notes..."
          className="w-full border-muted focus-visible:ring-0 focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {filteredNotes?.length === 0 ? (
          <p className="text-center text-muted-foreground">No matching notes found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="bg-background shadow-md hover:shadow-lg transition-shadow relative">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-xl truncate">{note.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {new Date(note.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/edit/${note.id}`}>
                        <Button size="icon" variant="outline">
                          <Pen className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteNote(note.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line line-clamp-4">
                    {note.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
