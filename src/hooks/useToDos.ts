import { useEffect, useState } from "react";
import { ToDo } from "../types/todo";
import { dummyData } from "../data/todos";

export default function useToDos() {
  const [todos, setToDos] = useState(() => {
    const savedToDos: ToDo[] = JSON.parse(localStorage.getItem("todos") || "[]"
    );
    return savedToDos.length > 0 ? savedToDos : dummyData;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setToDoCompleted(id: number, completed: boolean) {
    setToDos((prevToDos) => prevToDos.map(todo => (
      todo.id === id ? {...todo, completed} : todo
    )));
  };

  function addToDo(title: string) {
    setToDos(prevToDos => [
      ...prevToDos,
      {
        id: Date.now(),
        title,
        completed: false
      }
    ]);
  };

  function deleteToDo(id: number) {
    setToDos(prevToDos => prevToDos.filter(todo => todo.id !== id))
  }

  function deleteAllCompletedToDos() {
    setToDos(prevToDos => prevToDos.filter(todo => !todo.completed))
  }

  return {
    todos,
    addToDo,
    deleteToDo,
    setToDoCompleted,
    deleteAllCompletedToDos
  }
}
