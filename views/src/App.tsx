import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import SinglePost from "./pages/SinglePost";
import MainLayout from "./layouts/MainLayout";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },

    {
      path: "/index",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: "tweet/:id",
          element: <SinglePost />,
        },
        {
          path: "profile/:id",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
