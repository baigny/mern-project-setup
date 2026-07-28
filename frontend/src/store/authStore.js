import { create } from "zustand";
import client from "../api/client.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true, // true while checking for an existing session
  isAuthenticated: false,
  isAdmin: false,

  // Fetch the canonical user (includes isAdmin). Token is auto-attached by the client interceptor.
  loadUser: async () => {
    const res = await client.get("/auth/me");
    const user = res.data.user;
    set({ user, isAuthenticated: true, isAdmin: !!user.isAdmin });
  },

  // Call once on app mount: if a token exists, verify it and load the user
  init: async () => {
    if (!localStorage.getItem("token")) {
      set({ loading: false });
      return;
    }
    try {
      await get().loadUser();
    } catch {
      localStorage.removeItem("token"); // bad/expired token → drop it
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    const res = await client.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    await get().loadUser(); // canonical user, not the trimmed login payload
  },

  register: async (username, email, password) => {
    const res = await client.post("/auth/register", { username, email, password });
    localStorage.setItem("token", res.data.token);
    await get().loadUser();
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false, isAdmin: false });
  },
}));
