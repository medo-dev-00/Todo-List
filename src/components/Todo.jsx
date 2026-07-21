import editIcon from "../icons/edit.svg";
import removeIcon from "../icons/delete.svg";
import { ToastContext } from "../contexts/ToastContext";
import { ArrayOfTodos } from "../contexts/TodosContext";
import { useContext } from "react";

export default function Todo({ todo, showEdit, setCurrentTodo }) {
  // eslint-disable-next-line no-unused-vars
  const { todos, todosDispatch } = useContext(ArrayOfTodos);
  const { showHideToast } = useContext(ToastContext);
  // Complete Task
  function completeTask(id, event) {
    todosDispatch({
      type: "complete",
      payload: {
        id,
        event,
      },
    });
  }

  function deleteTask(id) {
    todosDispatch({
      type: "delete",
      payload: {
        id,
      },
    });
    showHideToast("تم حذف المهمة بنجاح");
  }
  return (
    <>
      <div
        className={` text-black rounded-sm bg-gray-50 shadow-md p-2 flex justify-between mb-2 ${todo.isCompleted ? "opacity-35 line-through" : ""} transition-all`}
        id={todo.id}
      >
        <div className="flex">
          <input
            type="checkbox"
            className="w-5 ml-2 checked:bg-gray-600"
            checked={todo.isCompleted}
            onChange={(e) => {
              completeTask(todo.id, e);
            }}
          />

          <div>
            <h2 className=" max-w-full">{todo.title}</h2>
            <p className="text-gray-400">{todo.body}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="w-9 h-9 p-1 rounded-full cursor-pointer  bg-[#03c6032c] border-2 border-[#249b1f] hover:scale-103 focus:scale-95 transition-all"
            onClick={() => {
              showEdit(todo);
              setCurrentTodo(todo);
            }}
          >
            <img src={editIcon} alt="Edit" className="w-full" />
          </button>
          <button
            className="w-9 h-9 p-1 rounded-full cursor-pointer bg-[#ff00002c] border-2 border-[#cd0303] scale-100 hover:scale-103 focus:scale-95 transition-all"
            onClick={() => {
              deleteTask(todo.id);
            }}
          >
            <img src={removeIcon} alt="Delete" className="w-full" />
          </button>
        </div>
      </div>
    </>
  );
}
