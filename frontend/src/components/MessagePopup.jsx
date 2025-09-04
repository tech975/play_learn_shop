// MessagePopup.jsx
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../utils/uiSlice";
import { useEffect } from "react";

export default function MessagePopup() {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.ui);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : "bg-gray-700 text-white"
      }`}
    >
      {message}
    </div>
  );
}
