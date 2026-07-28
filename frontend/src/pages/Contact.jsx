import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import client from "../api/client.js";
import { contactSchema } from "../lib/validators.js";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    setSent(false);
    try {
      await client.post("/contact", data);
      setSent(true);
      reset();
    } catch (err) {
      setError("root", { message: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div>
      <title>Contact</title>
      <h1>Contact</h1>
      {sent && <p>Message sent — thanks!</p>}
      {errors.root && <p>{errors.root.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Name
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
            Message
            <br />
            <textarea {...register("message")} />
          </label>
          {errors.message && <span>{errors.message.message}</span>}
        </p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
