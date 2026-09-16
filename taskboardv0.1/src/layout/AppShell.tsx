import { NavLink, Outlet } from "react-router-dom";
import { projects } from "../data/projects";

function AppShell() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4">
        <h1 className="text-xl font-bold mb-6">
          Project Management
        </h1>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `block mb-4 ${
              isActive ? "font-bold text-blue-600" : ""
            }`
          }
        >
          Projects
        </NavLink>

        <div className="space-y-2">
          {projects.map((project) => (
            <NavLink
              key={project.id}
              to={`/projects/${project.id}/board`}
              className={({ isActive }) =>
                `block rounded px-3 py-2 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {project.name}
            </NavLink>
          ))}
        </div>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;