import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { pool } from "../src/config/db.js";
import { loginTestUser } from "./helpers/auth.js";

let email = "";

describe("GET /users/me", () => {
  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      [email]
    );
  });

  it("should return current user", async () => {
    const { token, email: userEmail } = await loginTestUser();

email = userEmail;

const response = await request(app)
  .get("/users/me")
  .set("Authorization", `Bearer ${token}`);

expect(response.status).toBe(200);

expect(response.body).toMatchObject({
  email: userEmail,
  name: "Test User",
  role: "user",
});

expect(response.body).not.toHaveProperty("password");
  });
});