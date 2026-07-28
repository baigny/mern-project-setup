import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

export default function Layout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        {isAuthenticated ? (
          <>
            <span>Hi, {user.username}</span>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
