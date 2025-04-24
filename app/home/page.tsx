"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "@/lib/api";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Pen } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Get user ID on load
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const { data: notes = [], isLoading, isError } = useQuery({
    queryKey: ["notes", userId],
    queryFn: () => fetchNotes(userId!),
    enabled: !!userId, // wait until userId is available
  });

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
  );

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      mutation.mutate(id);
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

        {isLoading ? (
          <p>Loading notes...</p>
        ) : isError ? (
          <p className="text-red-500">Error loading notes</p>
        ) : filteredNotes.length === 0 ? (
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
                        onClick={() => handleDelete(note.id)}
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
