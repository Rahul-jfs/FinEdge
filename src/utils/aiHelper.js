export const suggestSavings = (transactions) => {
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);
  const suggestedSavings = totalIncome * 0.2 - totalExpenses * 0.1;
  return suggestedSavings > 0 ? suggestedSavings : 0;
};
