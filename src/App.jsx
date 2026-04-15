import { RouterProvider } from "react-router";
import { FriendProvider } from "./context/FriendContext.jsx";
import { router } from "./routes/Routes.jsx";

export default function App() {
  return (
    <FriendProvider>
      <RouterProvider router={router} />
    </FriendProvider>
  );
}
