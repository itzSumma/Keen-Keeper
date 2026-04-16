import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { FriendProvider } from "./context/FriendContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { router } from "./routes/Routes.jsx";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <ToastProvider>
      <FriendProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={3200}
          closeOnClick
          pauseOnHover
          draggable
          newestOnTop
          theme="light"
        />
      </FriendProvider>
    </ToastProvider>
  );
}
