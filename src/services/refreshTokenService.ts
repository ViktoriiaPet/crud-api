import crypto from "crypto";
import {pool} from "../config/db.js";

export const createRefreshToken = async (userId:number) =>  {
    const token = crypto.randomBytes(64).toString("hex");

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );

  return token;
}
export const getRefreshToken = async (token: string) => {
    const result = await pool.query(
    `SELECT token, user_id, expires_at
     FROM refresh_tokens
     WHERE token = $1`,
    [token]
  );

    return result.rows[0];
};

export const isRefreshTokenExpired = (expiresAt: Date) => {
    return new Date(expiresAt).getTime() <= Date.now();
}

export const deleteRefreshToken = async (token: string) => {
  const result = await pool.query(
    `DELETE FROM refresh_tokens
     WHERE token = $1`,
    [token]
  );

  return (result.rowCount ?? 0) > 0;
};;

export const deleteAllUserRefreshTokens = async (userId:number) => {};