/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/notes/delete/[id]/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: any) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const noteId = context?.params?.id;

  if (!noteId) {
    return NextResponse.json({ success: false, error: "Note ID is required" }, { status: 400 });
  }

  const { error: deleteError } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", user.id);

  if (deleteError) {
    return NextResponse.json(
      { success: false, error: deleteError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
