import { createUser, loginUser } from "../services/userService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    next(error);
  }
};
