import { useState } from "react";
import client from "../api/client.js";

export default function Contact() {
  const [form, setForm] = useState({ username: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrors([]);
    try {
      await client.post("/contact", form);
      setStatus("Message sent — thanks!");
      setForm({ username: "", email: "", message: "" });
    } catch (err) {
      const data = err.response?.data;
      setErrors(data?.errors?.map((er) => er.message) || [data?.message || "Something went wrong"]);
    }
  };

  return (
    <div>
      <h1>Contact</h1>
      {status && <p>{status}</p>}
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
            Name
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
            Message
            <br />
            <textarea name="message" value={form.message} onChange={handleChange} />
          </label>
        </p>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
