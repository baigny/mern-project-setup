import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { LogIn } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
import { Button } from "@/components/ui/button";
import { loginSchema } from "../lib/validators.js";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <title>Login</title>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Email
            <br />
            <input type="email" {...register("email")} />
          </label>
          {errors.email && <span>{errors.email.message}</span>}
        </p>
        <p>
          <label>
            Password
            <br />
            <input type="password" {...register("password")} />
          </label>
          {errors.password && <span>{errors.password.message}</span>}
        </p>
        <Button type="submit" disabled={isSubmitting}>
          <LogIn /> {isSubmitting ? "Logging in…" : "Log in"}
        </Button>
      </form>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
