"use client";

import { useState } from "react";
import { TodoType } from "@/utils/interface";
import List from "./List";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTodo } from "@/app/api/api";

interface FormType {
  todos: TodoType[];
}

const Form = ({ todos }: FormType) => {
  const [enteredTask, setEnteredTask] = useState("");
  const [displayedTodos, setDisplayedTodos] = useState<TodoType[]>(todos);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enteredTask === "") return;

    const newTodo = {
      id: String(Math.random() * 10e1),
      task: enteredTask,
      isDone: false,
    };

    const todo = await addTodo(newTodo);

    displayedTodos.unshift(todo);

    setDisplayedTodos(todos);
    refectedTodos(displayedTodos);

    setEnteredTask("");
  };

  const refectedTodos = (todos: TodoType[]) => {
    setDisplayedTodos(todos);
  };

  return (
    <>
      <form
        className="flex items-center justify-between gap-5"
        onSubmit={(e) => handleSubmit(e)}
        id="form"
      >
        <Input
          type="text"
          name="task"
          onChange={(e) => setEnteredTask(e.target.value)}
          value={enteredTask}
        />
        <Button className=" cursor-pointer bg-yellow-500">Add</Button>
      </form>

      <List todos={displayedTodos} refectedTodos={refectedTodos} />
    </>
  );
};

export default Form;
