/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import Toast from "../components/Toast";
import { useState } from "react";
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // Control Show And Hide Toast
  function showHideToast(toastMessage) {
    clearTimeout(1);
    setOpen(true);
    setTimeout(() => setOpen(false), 2000);
    setMessage(toastMessage);
  }

  // Return The Provider
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <Toast open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
