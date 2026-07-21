import { useState, useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

// Functions

export default function CreateTaskForm({
  showCreateTodo,
  setShowCreateTodo,
  todosDispatch,
}) {
  const { showHideToast } = useContext(ToastContext);

  // Set TaskTitle
  const [taskTitle, setTaskTitle] = useState("");
  // Set TaskBody
  const [taskBody, setTaskBody] = useState("");

  // Create Task Function
  function createTask() {
    todosDispatch({
      type: "create",
      payload: {
        taskTitle,
        taskBody,
      },
    });
    // Empty The Inputs
    setTaskTitle("");
    setTaskBody("");
    // Close Create Todo Form
    setShowCreateTodo(false);
    // Show Pop-Up Toast
    showHideToast("تم اضافة المهمة بنجاح");
  }

  return (
    <div
      className={`fixed inset-0 w-full h-full bg-[#7d7d7d6d] px-2 ${showCreateTodo ? "opacity-100 z-50" : "opacity-0 -z-10"} transition-all ease-in-out`}
      onClick={(e) => {
        if (e.target.id == "overlay") setShowCreateTodo(false);
      }}
      id="overlay"
    >
      <div
        className={`bg-white p-4 max-w-xl mx-auto mt-50 rounded-sm shadow-md shadow-gray-500 ${showCreateTodo ? "scale-100 opacity-100" : "scale-20 opacity-40"} transition-all`}
      >
        <div className="flex flex-col">
          <div>
            <label htmlFor="title" className="text-xl">
              عنوان المهمة
            </label>
            <input
              type="text"
              placeholder="مثال: أصلي العصر "
              className=""
              onChange={(event) => {
                setTaskTitle(event.target.value);
              }}
              value={taskTitle}
              id="title"
              className="block w-full focus:outline-none border-b mb-5 pb-1 text-xl indent-0.5 placeholder:text-[18px] focus:border-b-2 transition-all"
            />
          </div>
          <div>
            <label htmlFor="body" className="text-xl">
              التفاصيل
            </label>
            <input
              type="text"
              placeholder="يجب ان تكون في جماعة"
              className=""
              onChange={(event) => {
                setTaskBody(event.target.value);
              }}
              value={taskBody}
              id="body"
              className="block w-full focus:outline-none border-b mb-5 pb-1 text-xl indent-0.5 placeholder:text-[18px] focus:border-b-2 transition-all"
            />
          </div>
        </div>
        <button
          className="text-gray-600 border border-gray-600 px-3 py-1 rounded-sm block font-semibold mr-auto cursor-pointer hover:bg-gray-600 hover:text-white transition-all"
          onClick={() => {
            // If The Task Title Count Is Greater Than 2 Create The Task
            if (taskTitle.length > 2) {
              createTask();
            } else {
              // Otherwise Show Alert
              alert("Task Title Must Be Three Letters At Least ");
            }
          }}
        >
          إضافة المهمة
        </button>
      </div>
    </div>
  );
}
