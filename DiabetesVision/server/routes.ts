import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { log } from "./vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import multer from "multer";

// Define Django API URL
const DJANGO_API_URL = "http://localhost:8000";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Start Django server in a separate process
  import("child_process").then(({ spawn }) => {
    const djangoProcess = spawn("python", ["backend/run.py"], {
      stdio: "inherit",
      detached: true
    });
    
    djangoProcess.on("error", (err) => {
      log(`Failed to start Django server: ${err.message}`, "django");
    });
    
    process.on("exit", () => {
      if (!djangoProcess.killed) {
        djangoProcess.kill();
      }
    });
    
    log("Django server process started", "django");
  });
  
  // Proxy API requests to Django
  app.use("/api", createProxyMiddleware({
    target: DJANGO_API_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api" // No rewrite needed
    },
    onProxyReq: (proxyReq, req, res) => {
      log(`Proxying request to Django: ${req.method} ${req.url}`, "proxy");
    },
    onError: (err, req, res) => {
      log(`Proxy error: ${err.message}`, "proxy");
      res.status(500).json({ message: "Django API server error", error: err.message });
    }
  }));
  
  // Proxy admin requests to Django
  app.use("/admin", createProxyMiddleware({
    target: DJANGO_API_URL,
    changeOrigin: true
  }));
  
  // Proxy media files to Django
  app.use("/media", createProxyMiddleware({
    target: DJANGO_API_URL,
    changeOrigin: true
  }));
  
  // For backward compatibility - redirect old endpoints to Django
  app.post("/api/analyze", (req, res) => {
    res.redirect(307, "/api/upload/");
  });
  
  app.get("/api/analysis/:id", (req, res) => {
    res.redirect(307, `/api/analysis-results/${req.params.id}/`);
  });

  const httpServer = createServer(app);
  return httpServer;
}
