import {
  addNewTransaction,
  fetchTransactions,
  fetchTransactionById,
  modifyTransaction,
  removeTransaction,
  getIncomeExpenseSummary,
} from "../services/transactionService.js";

export const addTransaction = async (req, res, next) => {
  try {
    const transaction = await addNewTransaction(req.body);
    res.status(201).json({ message: "Transaction added", transaction });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await fetchTransactions();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await fetchTransactionById(req.params.id);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await modifyTransaction(req.params.id, req.body);
    res.json({ message: "Transaction updated", transaction });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    await removeTransaction(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    next(error);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const summary = await getIncomeExpenseSummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
};
