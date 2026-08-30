import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import crypto from "node:crypto";
import {createRefreshToken, isRefreshTokenExpired, getRefreshToken, deleteRefreshToken} from "./refreshTokenService.js";


export const register = async (name: string, email: string, password: string) => {
  const hash = await bcrypt.hash(password, 10);
  const uuid = crypto.randomUUID();

  const result = await pool.query(
    `INSERT INTO users (uuid, name, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id,uuid, name, email, role`,
    [uuid, name, email, hash]
  );

  return result.rows[0];
};

export const login = async (email: string, password: string) => {

  const result = await pool.query(
    "SELECT id, uuid, name, email, role, password FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) throw new Error("Invalid credentials");

  const {name, role, uuid} = user

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, role: user.role, uuid: user.uuid },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const refreshToken = await createRefreshToken(user.id);

  return { token, refreshToken, email, role, name, uuid };
};

export const refreshToken = async (refreshToken: string) => {
  const storedToken = await getRefreshToken(refreshToken);

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  if (isRefreshTokenExpired(storedToken.expires_at) ) {
    throw new Error("Refresh token expired");
  }
   const result = await pool.query(
    `SELECT id, uuid, role
     FROM users
     WHERE id = $1 AND is_active = true`,
    [storedToken.user_id]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      uuid: user.uuid,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  await deleteRefreshToken(refreshToken);

  const newRefreshToken = await createRefreshToken(user.id);


  return {
  token,
  refreshToken: newRefreshToken,
};
};