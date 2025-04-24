"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
    const supabase = createClient();
    const {user}:any = (await supabase).auth.getUser();

    if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});

    const {data, error}:any = (await supabase)
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {ascending:false});

    if(error) return NextResponse.json({error},{status:500});

    return NextResponse.json({notes:data},{status:200});
}