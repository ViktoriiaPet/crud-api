import {type User } from "../models/User.js";
import { pool } from "../config/db.js";


export const getAllUser = async (params: {
  offset: number;
  limit: number;
  email: string | undefined;
  name: string | undefined;
  sortBy: "id" | "name" | "email";
  order: "asc" | "desc";
}): Promise< { data: User[]; total: number; totalPages: number }> => {

    const result = await pool.query('SELECT * FROM users ORDER BY id ASC LIMIT $1 OFFSET $2', [params.limit, params.offset]);
    const countResult = await pool.query('SELECT COUNT(*) FROM users')
    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / params.limit);
    
    return {
    data: result.rows,
    total,
    totalPages
};
}

export const getUserById = async (id:number) : Promise<User | undefined> => {
   const result = await pool.query('SELECT * FROM users WHERE id = $1',
    [id])
   return result.rows[0];
}

export const createUser = async (user:User) : Promise<User | undefined> => {
    console.log("3 service start");
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, user.password])
    return result.rows[0];
}

export const updateUser = async (
  id: number,
  updateUser: Partial<User>
): Promise<User | undefined> => {
  const fields: string[] = [];
  const values: (string | number)[] = [];
  let index = 1;

  if (updateUser.name !== undefined) {
    fields.push(`name = $${index++}`);
    values.push(updateUser.name);
  }

  if (updateUser.email !== undefined) {
    fields.push(`email = $${index++}`);
    values.push(updateUser.email);
  }

  values.push(id);

  const result = await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
    values
  );

  return result.rows[0];
};

export const deleteUser = async (id:number): Promise<boolean>  => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return (result.rowCount ?? 0) > 0;
}