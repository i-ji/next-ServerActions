import { TodoType } from "@/utils/interface";

const ENDPOINT = "http://localhost:3001/todos";

export async function getAllTodos() {
  try {
    const res = await fetch(ENDPOINT);
    if (!res.ok) {
      throw new Error(`レスポンスステータス: ${res.status}`);
    }

    const todos = res.json();
    return todos;
  } catch (error) {
    console.error(error);
  }
}

export async function addTodo(todo: TodoType) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
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

export async function deleteTodo(id: string) {
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const deleteTask = res.json();
  return deleteTask;
}
