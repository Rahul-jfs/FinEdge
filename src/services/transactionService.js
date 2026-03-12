import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const transactionsFile = path.resolve("src/data/transactions.json");

export const addNewTransaction = async (transactionData) => {
  const data = await fs.readFile(transactionsFile, "utf-8");
  const transactions = JSON.parse(data);
  const newTransaction = { id: uuidv4(), ...transactionData };
  transactions.push(newTransaction);
  await fs.writeFile(transactionsFile, JSON.stringify(transactions, null, 2));
  return newTransaction;
};

export const fetchTransactions = async () => {
  const data = await fs.readFile(transactionsFile, "utf-8");
  return JSON.parse(data);
};

export const fetchTransactionById = async (id) => {
  const transactions = await fetchTransactions();
  return transactions.find((t) => t.id === id);
};

export const modifyTransaction = async (id, updateData) => {
  const transactions = await fetchTransactions();
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Transaction not found");

  transactions[index] = { ...transactions[index], ...updateData };
  await fs.writeFile(transactionsFile, JSON.stringify(transactions, null, 2));
  return transactions[index];
};

export const removeTransaction = async (id) => {
  let transactions = await fetchTransactions();
  transactions = transactions.filter((t) => t.id !== id);
  await fs.writeFile(transactionsFile, JSON.stringify(transactions, null, 2));
};

export const getIncomeExpenseSummary = async () => {
  const transactions = await fetchTransactions();
  const summary = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += t.amount;
      if (t.type === "expense") acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
  summary.balance = summary.income - summary.expense;
  return summary;
};
