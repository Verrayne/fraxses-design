import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { DocPage } from "./pages/DocPage";
import { HomePage } from "./pages/HomePage";
import "./generated-tailwind.css";
import "./styles.css";

const DashboardExamplePage = React.lazy(() => import("./pages/DashboardExamplePage").then((module) => ({ default: module.DashboardExamplePage })));

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
        path: "dashboard-example",
        element: (
          <Suspense fallback={<div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-6 py-10 text-subtle">Loading dashboard example...</div>}>
            <DashboardExamplePage />
          </Suspense>
        ),
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
