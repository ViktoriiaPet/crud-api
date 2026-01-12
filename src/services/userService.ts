import {type User } from "../models/User.js";
import { pool } from "../config/db.js";

export const getAllUser = async (): Promise<User[]> => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

export const getUserById = async (id:number) : Promise<User | undefined> => {
   const result = await pool.query('SELECT * FROM users WHERE id = $1',
    [id])
   return result.rows[0];
}

export const createUser = async (user:User) : Promise<User | undefined> => {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email])
    return result.rows[0];
}

export const updateUser = async (id:number, updateUser: Partial<User>): Promise<User | undefined> => {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [updateUser.name, updateUser.email, id])
    return result.rows[0]
}

export const deleteUser = async (id:number): Promise<boolean>  => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return (result.rowCount ?? 0) > 0;
}