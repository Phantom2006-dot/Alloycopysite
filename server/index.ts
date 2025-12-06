import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth";
import articlesRoutes from "./routes/articles";
import categoriesRoutes from "./routes/categories";
import tagsRoutes from "./routes/tags";
import mediaItemsRoutes from "./routes/mediaItems";
import teamMembersRoutes from "./routes/teamMembers";
import eventsRoutes from "./routes/events";
import uploadsRoutes from "./routes/uploads";
import productsRoutes from "./routes/products";
import productCategoriesRoutes from "./routes/productCategories";
import paymentsRoutes from "./routes/payments";
import { validateApiKey, checkApiKeyConfigured } from "./middleware/apiKey";
import { setupVite, serveStatic } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isStandaloneMode = process.env.BACKEND_MODE === "standalone";

checkApiKeyConfigured();

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : isStandaloneMode ? [] : ["*"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin && !isStandaloneMode) {
      callback(null, true);
    } else if (allowedOrigins.length === 0 || allowedOrigins.includes("*") || (origin && allowedOrigins.includes(origin))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    mode: process.env.BACKEND_MODE || "integrated"
  });
});

if (isStandaloneMode) {
  app.use("/api", validateApiKey);
}

app.use("/api/auth", authRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/media", mediaItemsRoutes);
app.use("/api/team", teamMembersRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/product-categories", productCategoriesRoutes);
app.use("/api/payments", paymentsRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  console.error(err);
  res.status(status).json({ message });
});

(async () => {
  const server = createServer(app);

  if (!isStandaloneMode) {
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
  } else {
    console.log("Running in standalone backend mode - no frontend served");
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Mode: ${isStandaloneMode ? 'Standalone Backend' : 'Integrated (Frontend + Backend)'}`);
    if (isStandaloneMode && process.env.CMS_API_KEY) {
      console.log("API key authentication enabled");
    }
  });
})();
