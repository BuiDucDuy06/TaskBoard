import { Link } from "react-router-dom";
import { projects } from "../data/projects";

function ProjectsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Projects
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}/board`}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            <h3 className="font-semibold">
              {project.name}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Open project board
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;