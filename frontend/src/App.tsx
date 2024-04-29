import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/home";
import SearchPage from "./components/searchpage";
import WorkPage from "./components/workpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<SearchPage />} />
          <Route path="/books/:id" element={<WorkPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
