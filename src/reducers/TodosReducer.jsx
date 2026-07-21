export default function TodosReducer(currentTodos, actions) {
  const { type, payload } = actions;

  switch (type) {
    //Complete State
    case "complete": {
      const { id, event } = payload;
      let newTodos = currentTodos.map((t) => {
        if (t.id === id) {
          t.isCompleted = event.target.checked;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }

    // Delete
    case "delete": {
      // Delete Task From The Main Array
      const { id } = payload;
      let filteredTodos = currentTodos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    }
    // Create State
    case "create": {
      const { taskTitle, taskBody } = payload;
      // Todo Object Details
      const todo = {
        title: taskTitle,
        body: taskBody,
        id: Date.now(),
        isCompleted: false,
      };
      // Read New Todos
      let newTodos = [...currentTodos, todo];
      // Store The Todos In LocalStorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
      // Show Pop-Up Toast
      return newTodos;
    }
    // Edit State
    case "edit": {
      const { todos, currentTodo, editedTitle, editedBody } = payload;

      // Select Id
      // Edit The Current Todo
      let editedTodos = todos.map((todo) => {
        // If Todo.id equals id Edit This Todo
        if (todo.id == currentTodo.id) {
          // Modified Details
          todo.title = editedTitle;
          todo.body = editedBody;
          todo.isCompleted = false;
        }
        // Return Todo
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(editedTodos));
      return editedTodos;
    }

    // Default State
    default: {
      let StorageTodos = localStorage.getItem("todos");
      if (StorageTodos) {
        return [...JSON.parse(StorageTodos)];
      }
    }
  }
}
