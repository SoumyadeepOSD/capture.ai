/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST(_: any, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  await supabase
    .from("notes")
    .delete()
    .eq("id", params.id)
    .eq("user_id", user.id);

  redirect("/");
}
