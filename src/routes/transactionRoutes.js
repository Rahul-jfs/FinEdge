import express from "express";
import {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";
import { validateTransaction } from "../middleware/validator.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protect all transaction routes
router.use(protect);

router.post("/", validateTransaction, addTransaction);
router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.patch("/:id", validateTransaction, updateTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary", getSummary);

export default router;
