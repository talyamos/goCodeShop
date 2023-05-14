import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import AdminPage from "./components/AdminPage";
import AdminLogin from "./components/AdminLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "products/:productId",
    element: <ProductPage />,
  },
  {
    path: "Cart",
    element: <CartPage />,
  },
  {
    path: "AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "Admin",
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
