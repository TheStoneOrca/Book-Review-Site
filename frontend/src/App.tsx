import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/home";
import SearchPage from "./components/searchpage";
import WorkPage from "./components/workpage";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MantineProvider>
                <HomePage />
              </MantineProvider>
            }
          />
          <Route
            path="/books"
            element={
              <MantineProvider>
                <SearchPage />
              </MantineProvider>
            }
          />
          <Route
            path="/books/:id"
            element={
              <MantineProvider>
                <WorkPage />
              </MantineProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
