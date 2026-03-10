const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const readUsers = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data || "[]");
};

const writeUsers = async (users) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };
