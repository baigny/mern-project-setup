import express from 'express';
import User from '../../models/user.js';
import { registerSchema, loginSchema } from "../../validators/auth.js";
import { requireAuth, redirectIfAuth } from "../../middlewares/web-auth.js";
const router = express.Router();

function establishSession(req, user) {
  req.session.userId = user._id;
  req.session.user = { username: user.username, email: user.email };
}

router.get('/', (req, res) => {
    res.render("home", { title: "Home" });
});

router.get("/users", async (req, res) => {
    const users = await User.find().select("-password").sort({createdAt: -1});
    res.render("users", { title: "Users", users });
});

// --- Register ---
router.get("/register", redirectIfAuth, (req, res) => {
  res.render("register", { title: "Register", errors: [], values: {} });
});

router.post("/register", redirectIfAuth, async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).render("register", {
      title: "Register",
      errors: result.error.issues.map((i) => i.message),
      values: req.body,
    });
  }

  const { username, email, password } = result.data;
  if (await User.findOne({ email })) {
    return res.status(409).render("register", {
      title: "Register",
      errors: ["Email already registered"],
      values: req.body,
    });
  }

  const user = await User.create({ username, email, password });
  establishSession(req, user);
  res.redirect("/dashboard");
});

// --- Login ---
router.get("/login", redirectIfAuth, (req, res) => {
  res.render("login", { title: "Login", errors: [], values: {} });
});

router.post("/login", redirectIfAuth, async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).render("login", {
      title: "Login",
      errors: result.error.issues.map((i) => i.message),
      values: req.body,
    });
  }

  const { email, password } = result.data;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).render("login", {
      title: "Login",
      errors: ["Invalid credentials"],
      values: req.body,
    });
  }

  establishSession(req, user);
  res.redirect("/dashboard");
});

// --- Logout ---
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

// --- Protected page ---
router.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { title: "Dashboard", currentUser: req.session.user });
});


export default router;