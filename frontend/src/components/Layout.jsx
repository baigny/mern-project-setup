import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../store/authStore.js";
import { Button } from "@/components/ui/button";
import Footer from "./Footer.jsx";

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
    <div className="flex min-h-screen flex-col">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <nav className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-foreground hover:text-primary">
            Home
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">Hi, {user.username}</span>
              <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
                <LogOut /> Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted-foreground hover:text-foreground">
                Login
              </Link>
              <Link to="/register" className="text-muted-foreground hover:text-foreground">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
