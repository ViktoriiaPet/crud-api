import crypto from "node:crypto";
import request from "supertest";
import { describe, expect, it, afterEach } from "vitest";
import { app } from "../../src/app.js";
import { pool } from "../../src/config/db.js";
import { registerTestUser } from "../helpers/auth.js";

let email: string;

describe("POST /auth/register", () => {
  it("should register a new user", async () => {

    const result = await registerTestUser();

    email = result.email;

    const response = result.response;

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      name: "Test User",
      email: expect.stringContaining("@example.com"),
    });

    expect(response.body).not.toHaveProperty("password");
  });
});


afterEach(async () => {
  await pool.query(
    "DELETE FROM users WHERE email = $1",
    [email]
  );
});