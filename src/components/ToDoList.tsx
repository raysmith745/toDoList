import { ToDo } from "../types/todo";
import ToDoItem from "./ToDoItem";

interface ToDoListProps {
  toDos: ToDo[];
  onCompleteChange: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function ToDoList({
  toDos,
  onCompleteChange,
  onDelete,
}: ToDoListProps) {
  const toDoListSorted = toDos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed ? 1 : -1;
  });
 
  return (
    <>
    <div className="space-y-2">
      {toDoListSorted.map((todo) => (
        <ToDoItem
          todo={todo}
          key={todo.id}
          onCompletedChange={onCompleteChange}
          onDelete={onDelete}
        />
      ))}
    </div>
    {toDos.length === 0 && (
      <p className="text-center text-sm text-gray-500">
        No ToDos yet. Add a new one above.
      </p>
    )} 
    </>
  );
}
