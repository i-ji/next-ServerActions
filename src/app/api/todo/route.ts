import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { task } = await request.json();

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task: task, isDone: false }])
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
