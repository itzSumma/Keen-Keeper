import { RouterProvider } from "react-router";
import { FriendProvider } from "./context/FriendContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { router } from "./routes/Routes.jsx";
import ToastViewport from "./components/ToastViewport.jsx";

export default function App() {
  return (
    <ToastProvider>
      <FriendProvider>
        <RouterProvider router={router} />
        <ToastViewport />
      </FriendProvider>
    </ToastProvider>
  );
}
