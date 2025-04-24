"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function addNote(formData: FormData) {
    console.log("Server action: addNote");
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log("User:", user);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    console.log("Title:", title);
    console.log("Content:", content);

    if (!user || !title || !content) {
        console.error("Validation failed");
        return;
    }

    const { error } = await supabase.from("notes").insert({
        user_id: user.id,
        title,
        content,
    });

    if (error) {
        console.error("Insert failed:", error);
        return;
    }
    console.log("Note added!");
      redirect("/home"); // redirect back to homepage after creation
}
