/* eslint-disable no-useless-assignment */
// Hooks
import { ArrayOfTodos } from "../contexts/TodosContext";
import { ToastContext } from "../contexts/ToastContext";
import { useState, useContext, useEffect, useMemo } from "react";

// Components
import Todo from "./Todo";
import EditTaskForm from "./EditTaskForm";
import CreateTaskForm from "./CreateTaskForm";

export default function TodoList() {
  // Set Todos
  const { todos, todosDispatch } = useContext(ArrayOfTodos);

  // Function That Control In Show And Hide Task
  const { showHideToast } = useContext(ToastContext);
  // Delete Confirmation Message
  const [confirm, showConfirm] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  // Set Todos TO Be Rendered
  const [renderedTodos, setRenderedTodos] = useState("all");

  // Filter The Todos
  let StorageTodos = localStorage.getItem("todos");

  // Set Todo That Will Be Edited
  const [currentTodo, setCurrentTodo] = useState({});

  // Dialog State
  const [modal, showEdit] = useState(false);
  // Create Task Form State
  const [showCreateTask, setShowCreateTask] = useState(false);

  // When Page Load
  useEffect(
    () => {
      todosDispatch({ type: "get" });
    },
    /* Dependencies Array */ [StorageTodos],
  );

  // Filtered Todos

  // Completed Todos
  // Using "useMemo" To Render When todos array Change
  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted === true);
  }, [todos]);

  // Non Completed Todos
  // Using "useMemo" To Render When todos array Change
  const nonCompletedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted === false);
  }, [todos]);

  // Set The Todos That Will Be Rendered
  let todosToBeRendered = todos;
  // If RenderedTodos Equals Completed
  if (renderedTodos === "completed") {
    // Render Completed Todos
    todosToBeRendered = completedTodos;
  }
  //Else If RenderedTodos Equals Non Completed
  else if (renderedTodos === "non-completed") {
    // Render Non Completed Todos
    todosToBeRendered = nonCompletedTodos;
  } else {
    // Otherwise Show All Todos
    todosToBeRendered = todos;
  }

  // Convert Tasks From Object To JSX Component

  function showModal(todo) {
    setEditedTitle(todo.title);
    setEditedBody(todo.body);
    setCurrentTodo(todo);
    showEdit(true);
  }

  // Edit Todo Function
  function editTodo() {
    todosDispatch({
      type: "edit",
      payload: {
        todos,
        currentTodo,
        editedTitle,
        editedBody,
      },
    });
    // Show Toast
    showHideToast("تم تعديل المهمة بنجاح");
    // Close Edit Form
    showEdit(false);
  }

  // Delete All Todos
  function deleteAllTodos() {
    // Remove All Todos From Local Storage And The The State
    let filteredTodos = todos;
    if (renderedTodos === "completed") {
      filteredTodos = todos.filter((t) => t.isCompleted === false);
      // Show Toast
      showHideToast("تم حذف المهام المكتملة بنجاح");
    } else if (renderedTodos === "non-completed") {
      filteredTodos = todos.filter((t) => t.isCompleted === true);
      // Show Toast
      showHideToast("تم حذف المهام غير المكتملة بنجاح");
    } else {
      filteredTodos = [];
      // Show Toast
      showHideToast("تم حذف جميع المهام بنجاح");
    }

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
    // Then Close The Confirm Message
  }

  const jsxTodos = todosToBeRendered.map((todo) => (
    <Todo
      // Props
      todo={todo}
      todos={todos}
      key={todo.id}
      // Method
      modal={modal}
      showEdit={showModal}
      setCurrentTodo={setCurrentTodo}
    />
  ));

  return (
    <>
      <h1 className="text-4xl font-bold w-fit mx-auto mb-8 text-black">
        مهامي
      </h1>
      {/* Filter Tasks  */}

      <div className="flex justify-center mb-5 border w-fit mx-auto ">
        {/* All Tasks  */}
        <button
          className={`${renderedTodos === "all" ? "bg-gray-400" : "bg-white"} text-black px-3 py-1  cursor-pointer border-r border-gray-400 hover:bg-gray-400 transition-all`}
          onClick={(e) => {
            setRenderedTodos(e.target.value);
          }}
          value="all"
        >
          الكل
        </button>
        <button
          className={`${renderedTodos === "completed" ? "bg-gray-400" : "bg-white"}  text-black px-3 py-1 cursor-pointer border-r border-gray-400 hover:bg-gray-400 transition-all`}
          onClick={(e) => {
            setRenderedTodos(e.target.value);
          }}
          value="completed"
        >
          {/* Completed Tasks */}
          مكتمل
        </button>
        <button
          className={`${renderedTodos === "non-completed" ? "bg-gray-400" : "bg-white"} text-black px-3 py-1 cursor-pointer border-r border-gray-400 hover:bg-gray-400 transition-all`}
          onClick={(e) => {
            setRenderedTodos(e.target.value);
          }}
          value="non-completed"
        >
          {/* UnCompleted Tasks  */}
          غير مكتمل
        </button>
      </div>
      <div className="flex items-center justify-center gap-1 flex-wrap mb-5">
        {renderedTodos === "all" ? (
          <>
            <h2 className={`bg-gray-500 w-fit p-1 text-white rounded-sm`}>
              المهام: {todos.length}
            </h2>
            <h2 className={`bg-gray-500 w-fit p-1 text-white rounded-sm`}>
              المهام المكتملة: {completedTodos.length}
            </h2>
            <h2 className={`bg-gray-500 w-fit p-1 text-white rounded-sm`}>
              المهام الغير مكتملة: {nonCompletedTodos.length}
            </h2>{" "}
          </>
        ) : renderedTodos === "completed" ? (
          <h2 className={`bg-gray-500 w-fit p-1 text-white rounded-sm`}>
            المهام المكتملة: {completedTodos.length}
          </h2>
        ) : (
          <h2 className={`bg-gray-500 w-fit p-1 text-white rounded-sm`}>
            المهام الغير مكتملة: {nonCompletedTodos.length}
          </h2>
        )}
      </div>
      {/* Show JSX Tasks To Page */}

      <div
        className={`absolute bg-[#0000006e] w-full h-full left-0 top-0 overflow-hidden px-2  transition-all ${confirm ? "z-50 opacity-100 " : "-z-10 opacity-20"}`}
      >
        <div
          className={`bg-white p-4 rounded-sm max-w-xl mx-auto mt-70 ${confirm ? "z-50 opacity-100 scale-100" : "-z-50 opacity-0 scale-80"} transition-all`}
        >
          <h2 className="text-xl mb-4">هل أنت متأكد من حذف هذه المهام</h2>
          <div className="flex gap-4 justify-end">
            <button
              className="text-gray-900 cursor-pointer"
              onClick={() => {
                // When Confirm Clicked
                deleteAllTodos();
                showConfirm(false);
              }}
            >
              تأكيد
            </button>
            <button
              className="text-red-600 cursor-pointer"
              onClick={() => {
                // Then Close The Confirm Message
                showConfirm(false);
              }}
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>

      <section
        className={`bg-gray-400 p-4 rounded-sm mb-5 mx-auto max-h-[80vh] overflow-auto scrollbar-thumb-gray-400 scrollbar-track-transparent shadow-xl shadow-[#adadad92 0 0 10px]`}
      >
        {jsxTodos != "" ? (
          jsxTodos
        ) : (
          <div className="mx-auto w-fit text-2xl text-black p-4">
            لا يوجد مهام
          </div>
        )}
      </section>

      {/* Create Task Form   */}
      <div>
        <div className="flex items-center justify-between px-4">
          <button
            className="bg-[#000c16] text-white p-2 rounded-md cursor-pointer"
            onClick={() => setShowCreateTask(true)}
          >
            إنشاء مهمة
          </button>
          {todosToBeRendered.length > 2 ? (
            <button
              className="bg-red-700 text-white p-2 rounded-md cursor-pointer"
              onClick={() => {
                // Then Show Confirm Delete Message
                showConfirm(true);
              }}
            >
              {renderedTodos === "all"
                ? "حذف جميع المهام"
                : renderedTodos === "completed"
                  ? "حذف المهام المكتملة"
                  : "حذف المهام غير المكتملة"}
            </button>
          ) : (
            // Else Do Not Show The Button
            ""
          )}
        </div>

        <CreateTaskForm
          showCreateTodo={showCreateTask}
          setShowCreateTodo={setShowCreateTask}
          todosDispatch={todosDispatch}
        />
      </div>

      <EditTaskForm
        // Show Modal State
        showEdit={showEdit}
        // Modal State
        modal={modal}
        // Current Task Title
        title={editedTitle}
        setTitle={setEditedTitle}
        // Current Task Body
        body={editedBody}
        setBody={setEditedBody}
        editTodo={editTodo}
      />
    </>
  );
}
