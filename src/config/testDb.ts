import { pool } from "./db.js";

async function testConnection () {
    try{
        const res = await pool.query('SELECT 1')
        console.log ('answer from the server', res.rows[0])
    } catch (e) {
        console.error('Connection failed', e)
    } finally {
    await pool.end();
  }
}

testConnection();