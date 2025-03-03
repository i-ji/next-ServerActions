import React from "react";
// import { editTodo } from "@/app/api/api";
import { Button } from "@/components/ui/button";

interface ListBtnType {
  btnName: string;
  btnColor: string;
  btnActions: () => void;
}

const ListBtn = ({ btnName, btnColor, btnActions }: ListBtnType) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    btnActions();
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <Button className={`cursor-pointer bg-${btnColor}`}>{btnName}</Button>
    </form>
  );
};

export default ListBtn;
