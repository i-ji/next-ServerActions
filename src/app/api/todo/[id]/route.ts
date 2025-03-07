import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/utils/supabase";

interface ParamsType {
  params: {
    id: number;
  };
}

export async function GET(req: NextRequest, { params }: ParamsType) {
  const { id } = params;
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(todos);
}

export async function PUT(request: Request, { params }: ParamsType) {
  const { id } = params;
  const todo = await request.json();

  const { data, error } = await supabase
    .from("todos")
    .update({ task: todo.task, isDone: todo.isDone })
    .eq("id", id)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: ParamsType) {
  const { id } = params;

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
