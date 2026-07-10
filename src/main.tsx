import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { DocPage } from "./pages/DocPage";
import { HomePage } from "./pages/HomePage";
import "./generated-tailwind.css";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "docs/intenda/:section?/:slug?/:topic?",
        element: <DocPage />,
      },
      {
        path: "docs/oryx/:section?/:slug?/:topic?",
        element: <DocPage />,
      },
      {
        path: "docs/:section?/:slug?/:topic?",
        element: <DocPage />,
      },
      {
        path: "themes/:themeId",
        element: <DocPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
