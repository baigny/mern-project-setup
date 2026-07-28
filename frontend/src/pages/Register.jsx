import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore.js";
import { registerSchema } from "../lib/validators.js";

export default function Register() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.username, data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("root", { message: err.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div>
      <title>Register</title>
      <h1>Register</h1>
      {errors.root && <p>{errors.root.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Username
            <br />
            <input {...register("username")} />
          </label>
          {errors.username && <span>{errors.username.message}</span>}
        </p>
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "Create account"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
