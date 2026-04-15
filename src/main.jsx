import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-center text-blue-500 ">Hi</div>,
   
  },
  {
    path: "/button",
    element: <button className="btn btn-active"> Click here</button>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
