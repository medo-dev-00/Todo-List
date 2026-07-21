import { createContext, useReducer } from "react";
// Reducers
import TodosReducer from "../reducers/TodosReducer";
// eslint-disable-next-line react-refresh/only-export-components
export let ArrayOfTodos = createContext([]);

const TodosProvider = ({ children }) => {
  let [todos, todosDispatch] = useReducer(TodosReducer, []);
  return (
    <ArrayOfTodos.Provider value={{ todos, todosDispatch }}>
      {children}
    </ArrayOfTodos.Provider>
  );
};

export default TodosProvider;
