import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import MyForm from "./components/MyForm";
import MyTable from "./components/MyTable";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MyTable />,
      },
      {
        path: "/add-user",
        element: <MyForm />,
      },
      {
        path: "/edit-user/:id",
        element: <MyForm />,
      },
    ],
  },

  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);
