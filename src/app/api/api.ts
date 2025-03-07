import { TodoType } from "@/utils/interface";

const ENDPOINT = "http://localhost:3000/api/todo";

export async function getAllTodos() {
  try {
    const res = await fetch(ENDPOINT);
    if (!res.ok) {
      throw new Error(`レスポンスステータス: ${res.status}`);
    }

    const todos = res.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
}

export async function addTodo(task: string) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: task }),
  });

  const newTask = res.json();
  return newTask;
}

export async function editTodo(todo: TodoType) {
  const res = await fetch(`${ENDPOINT}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  const updatedTask = res.json();
  return updatedTask;
}

export async function deleteTodo(id: number) {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const deleteTask = res.json();
  return deleteTask;
}
