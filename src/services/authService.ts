import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const register = async (name: string, email: string, password: string) => {
  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role`,
    [name, email, hash]
  );

  return result.rows[0];
};

export const login = async (email: string, password: string) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 RETURNING id, name, email, role",
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return { token };
};