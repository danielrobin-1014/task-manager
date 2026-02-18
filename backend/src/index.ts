/**
 * Main application entry point
 */

import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectDatabase } from "./config/database";
import { requestLogger } from "./middleware/logger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { swaggerDocument } from "./config/swagger";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Swagger documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes will be added here
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api", (_req: Request, res: Response) => {
  res.json({ 
    message: "Task Management API",
    documentation: "/api/docs",
    version: "1.0.0"
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler as express.ErrorRequestHandler);

// Start server
const PORT = parseInt(process.env.PORT || "5000", 10);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
