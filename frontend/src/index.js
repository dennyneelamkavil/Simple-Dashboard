import React from "react";
import ReactDOM from "react-dom/client";
import{ Provider } from "react-redux"
import {store} from "./store/store"
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="bottom-right" pauseOnHover />
  </Provider>
);
