import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <title>404 — Page not found</title>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Back home</Link>
    </div>
  );
}
