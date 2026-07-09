import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { DocPage } from "./pages/DocPage";
import { routes } from "./content/navigation";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/docs/overview" replace /> },
      {
        path: "docs/:section?/:slug?",
        element: <DocPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes[0].items[0].href} replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
