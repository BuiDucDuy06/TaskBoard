import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";

function ProjectDetailPage() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === Number(projectId)
  );

  if (!project) {
    return <p className="p-6">Project not found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        {project.name}
      </h2>

      <p className="mt-2 text-gray-600">
        Project detail
      </p>

      <Link
        to={`/projects/${project.id}/board`}
        className="inline-block mt-4 text-blue-600"
      >
        Open Board →
      </Link>
    </div>
  );
}

export default ProjectDetailPage;