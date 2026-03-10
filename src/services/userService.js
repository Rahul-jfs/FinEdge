import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";

const usersFile = path.resolve("src/data/users.json");

export const createUser = async ({ name, email, password }) => {
  const data = await fs.readFile(usersFile, "utf-8");
  const users = JSON.parse(data);

  if (users.find((u) => u.email === email))
    throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), name, email, password: hashedPassword };
  users.push(newUser);

  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  return { id: newUser.id, name, email };
};

export const loginUser = async ({ email, password }) => {
  const data = await fs.readFile(usersFile, "utf-8");
  const users = JSON.parse(data);

  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
