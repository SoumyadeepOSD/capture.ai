/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: any) {
  const supabase = await createClient();
  const { title, content } = await req.json();
  const id = context?.params?.id;

  if (!id || !title || !content) {
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Note Updated" }, { status: 200 });
}
