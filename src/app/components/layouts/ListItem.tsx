import React, { useState } from "react";
import { TodoType } from "@/utils/interface";
import ListBtn from "../parts/ListBtn";
import { Input } from "@/components/ui/input";

interface ListItemType {
  todo: TodoType;
  updatedTodos: (todo: TodoType) => void;
  destoryTodos: (todo: TodoType) => void;
}

const ListItem = ({ todo, updatedTodos, destoryTodos }: ListItemType) => {
  const toggleIsDone = () => {
    const newTodo = {
      id: todo.id,
      task: todo.task,
      isDone: !todo.isDone,
    };

    updatedTodos(newTodo);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const isEditingState = () => {
    setIsEdit(true);
  };
  const isEditedState = async () => {
    const newTodo = {
      id: todo.id,
      task: editedTask,
      isDone: false,
    };

    updatedTodos(newTodo);

    setIsEdit(false);
  };

  const destroyTodo = () => {
    destoryTodos(todo);
  };

  return (
    <div className="flex items-center justify-between">
      {isEdit ? (
        <div>
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </div>
      ) : (
        <div className={`${todo.isDone ? "line-through text-gray-400" : ""}`}>
          {todo.task}
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <ListBtn
          btnName={todo.isDone ? "未完" : "完了"}
          btnColor={"green-500"}
          btnActions={toggleIsDone}
        />

        {isEdit ? (
          <ListBtn
            btnName={"修正"}
            btnColor={"blue-500"}
            btnActions={isEditedState}
          />
        ) : (
          <ListBtn
            btnName={"編集"}
            btnColor={"blue-500"}
            btnActions={isEditingState}
          />
        )}

        <ListBtn
          btnName={"削除"}
          btnColor={"red-500"}
          btnActions={destroyTodo}
        />
      </div>
    </div>
  );
};

export default ListItem;
