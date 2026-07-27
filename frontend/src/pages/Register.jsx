import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client.js";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const { data } = await client.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      setErrors(data?.errors?.map((er) => er.message) || [data?.message || "Registration failed"]);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
            Username
            <br />
            <input name="username" value={form.username} onChange={handleChange} />
          </label>
        </p>
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
        <button type="submit">Create account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
