import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        404
      </h1>

      <p className="mt-2 text-gray-600">
        Page not found.
      </p>

      <Link
        to="/projects"
        className="mt-4 text-blue-600"
      >
        Back to Projects
      </Link>
    </div>
  );
}

export default NotFoundPage;