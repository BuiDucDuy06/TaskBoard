import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskBoardPage } from "./components/TaskBoardPage";
import AppShell from "./layout/AppShell";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />

          <Route
            path="/projects/:projectId/board"
            element={<TaskBoardPage />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
