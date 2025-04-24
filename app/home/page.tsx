/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { fetchNotes, deleteNote, summarizeNote } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Trash2, Pen, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // For summarizer modal
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [noteToSummarize, setNoteToSummarize] = useState<any>(null);

  const handleSummarize = async () => {
    if (!noteToSummarize) return;

    try {
      setLoading(true);
      const result = await summarizeNote(noteToSummarize.content);
      setSummary(result);
    } catch (err: any) {
      alert(`Failed to summarize note ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const { data: notes = [], isLoading, isError } = useQuery({
    queryKey: ["notes", userId, debouncedQuery],
    queryFn: () => fetchNotes(userId!, debouncedQuery),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId, debouncedQuery] });
    },
  });

  const handleDelete = (id: string) => mutation.mutate(id);

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
        ) : notes.length === 0 ? (
          <p className="text-center text-muted-foreground">No matching notes found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {notes.map((note) => (
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

                      <button
                        onClick={() => {
                          setNoteToSummarize(note);
                          setSummary("");
                          setOpen(true);
                        }}
                      >
                        <Star className="w-4 h-4 text-yellow-500" />
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger className="hover:cursor-pointer">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure to delete this note <span className="font-bold">&rdquo;{note.title}&rdquo;</span>?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your note.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(note.id)}
                              className="bg-red-500 hover:bg-red-800"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

      {/* Summarize Dialog (Global) */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Summarize your note using GenAI 🤖</AlertDialogTitle>
            <AlertDialogDescription>
              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="animate-spin text-primary h-5 w-5" />
                </div>
              ) : summary && (
                <div className="mt-4 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-md whitespace-pre-line">
                  {summary}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <button
              onClick={handleSummarize}
              disabled={loading || !noteToSummarize}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-800 px-4 py-2"
            >
              Summarize
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
