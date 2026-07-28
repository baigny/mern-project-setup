import { useAuthStore } from "../store/authStore.js";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <div>
      <title>Home</title>
      <h1>Welcome</h1>
      <p>React frontend talking to the Express/Mongo API.</p>
      <pre>{JSON.stringify({ isAuthenticated, user }, null, 2)}</pre>
    </div>
  );
}
