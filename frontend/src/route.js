import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<HomePage />,
  },
  {
    path: "/add-user",
    element: <FormPage />,
  },
  {
    path: "/edit-user/:id",
    element: <FormPage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
