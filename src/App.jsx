import { useState } from "react";
import "./App.css";

import TodoList from "./components/TodoList";
import { ArrayOfTodos } from "./contexts/TodosContext";

import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";
import Pomodoro from "./components/Pomodoro";
function App() {
  // Create Todos State


  return (
    <main className="min-h-dvh bg-gray-200">
      {/* If Confirm Equal True Return The Confirm Message  */}
      <div className="p-4 rounded-sm max-w-3xl mx-auto  ">
        {/* Toast Provider */}
    
          <TodosProvider>
            <ToastProvider>
              {/* The Main Todos Context  */}

              {/* Main Todos Component  */}
              {/* <Pomodoro /> */}
              <TodoList />
              {/* Close Todos Context  */}

              {/* Close Toast Provider  */}
            </ToastProvider>
          </TodosProvider>
      </div>
    </main>
  );
}

export default App;
