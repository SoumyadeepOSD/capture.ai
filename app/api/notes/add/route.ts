import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const { title, content } = await req.json();
  
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user || !title || !content) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }
  
    const { error } = await supabase.from("notes").insert({
      user_id: user.id,
      title,
      content,
    });
  
    if (error) return NextResponse.json({ error }, { status: 500 });
  
    return NextResponse.json({ message: "Note Added" }, { status: 200 });
  }
  