import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkPage from "./components/workpage.tsx";
import SearchPage from "./components/searchpage.tsx";
import HomePage from "./components/home.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<SearchPage />} />
        <Route path="/books/:id" element={<WorkPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
