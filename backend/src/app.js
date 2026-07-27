import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import swaggerUi from "swagger-ui-express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/api/auth.js";
import webRoutes from "./routes/web/routes.js";
import { notFound, errorHandler } from "./middlewares/errors.js";

// ESM has no __dirname — derive it from import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// View engine + static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions for the web side, persisted in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Make the logged-in user available to every EJS view
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON API routes
app.use("/api/auth", authRoutes);

// Server-rendered web routes
app.use("/", webRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is alive" });
});

// Error handling — always last
app.use(notFound);
app.use(errorHandler);

export default app;