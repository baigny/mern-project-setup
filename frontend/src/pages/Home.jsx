import { Link } from "react-router-dom";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import { Button } from "@/components/ui/button";

export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <title>Home</title>
      <h1 className="text-4xl font-semibold text-foreground">
        {isAuthenticated ? `Welcome back, ${user.username}` : "Welcome"}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A React frontend talking to an Express/MongoDB API — JWT auth, admin roles, and a contact
        form, all wired end to end.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        {!isAuthenticated && (
          <Button asChild>
            <Link to="/register">
              <ShieldCheck /> Get started
            </Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link to="/contact">
            <MessageSquare /> Contact us
          </Link>
        </Button>
      </div>
    </div>
  );
}
