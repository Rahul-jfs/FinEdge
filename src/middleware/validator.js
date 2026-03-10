export const validateTransaction = (req, res, next) => {
  const { type, category, amount, date } = req.body;
  if (!type || !category || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "Type must be income or expense" });
  }
  next();
};
