import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// جلوگیری از هشدارهای React Router آینده
// این بخش فقط هشدارها را از کنسول حذف می‌کند
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0]?.includes("React Router Future Flag Warning") ||
      args[0]?.includes("Deprecation Warning")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
