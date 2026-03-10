import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./src/routes/userRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server running" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // for testing
