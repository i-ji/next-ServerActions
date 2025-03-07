import { getAllTodos } from "./api/api";
import Form from "./components/layouts/Form";

export default async function Home() {
  const todos = await getAllTodos();

  const cloneTodos = [...todos];

  return (
    <div className="max-w-[640px] mx-auto mt-10 px-3 sm:px-0">
      <h1 className=" font-bold text-center text-3xl pb-5">Todo App</h1>
      <Form todos={cloneTodos} />
    </div>
  );
}
