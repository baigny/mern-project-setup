import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import client from "../api/client.js";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const { data } = await client.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      setErrors(data?.errors?.map((er) => er.message) || [data?.message || "Login failed"]);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Email
            <br />
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Password
            <br />
            <input type="password" name="password" value={form.password} onChange={handleChange} />
          </label>
        </p>
        <Button type="submit">
          <LogIn /> Log in
        </Button>
      </form>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
