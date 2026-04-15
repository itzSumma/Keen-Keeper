import { createHashRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import Homepage from "../pages/Homepage.jsx";
import TimelinePage from "../pages/TimelinePage.jsx";
import StatsPage from "../pages/StatsPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import FriendDetailsPage from "../pages/FriendDetailsPage.jsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "friends/:friendId", element: <FriendDetailsPage /> },
      { path: "timeline", element: <TimelinePage /> },
      { path: "stats", element: <StatsPage /> },
    ],
  },
]);
