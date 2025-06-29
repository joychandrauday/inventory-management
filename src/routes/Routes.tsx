import Main from "@/layout/Main";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ]
  },
]);

export default router;