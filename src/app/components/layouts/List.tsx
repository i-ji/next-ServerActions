import React from "react";
import { TodoType } from "@/utils/interface";
import { editTodo, deleteTodo } from "@/app/api/api";
import { Card, CardContent } from "@/components/ui/card";
import ListItem from "./ListItem";

interface ListType {
  todos: TodoType[];
  refectedTodos: (todos: TodoType[]) => void;
}

const List = ({ todos, refectedTodos }: ListType) => {
  const cloneTodos = [...todos];
  const updatedTodos = async (todo: TodoType) => {
    const [updatedTodo] = await editTodo(todo);

    cloneTodos.forEach((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.isDone = updatedTodo.isDone;
        todo.task = updatedTodo.task;
      }
    });

    refectedTodos(cloneTodos);
  };

  const destoryTodos = async (todo: TodoType) => {
    const [deletedTodo] = await deleteTodo(todo.id);

    const newTodos = cloneTodos.filter((todo) => {
      return deletedTodo.id !== todo.id;
    });

    refectedTodos(newTodos);
  };

  return (
    <div className="mt-10 mb-20 space-y-2">
      {todos.map((todo) => {
        return (
          <Card
            key={todo.id}
            className={`shadow ${
              todo.isDone ? "bg-gray-100" : ""
            } transition delay-50 duration-150 ease-in-out hover:scale-102`}
          >
            <CardContent>
              <ListItem
                todo={todo}
                updatedTodos={updatedTodos}
                destoryTodos={destoryTodos}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default List;
