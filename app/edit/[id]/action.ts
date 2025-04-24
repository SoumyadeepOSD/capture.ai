"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function editNote(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!user || !id || !title || !content) return;

  await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", id)
    .eq("user_id", user.id);

  redirect("/home");
}
