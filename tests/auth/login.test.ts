import { afterEach, describe, expect, it } from "vitest";
import { pool } from "../../src/config/db.js";
import { loginTestUser } from "../helpers/auth.js";

let email = "";

describe("POST /auth/login", () => {
  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      [email]
    );
  });

  it("should login a registered user", async () => {
    const { response, email: userEmail, token } = await loginTestUser();

    email = userEmail;

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      email: userEmail,
      role: "user",
      name: "Test User",
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);
  });
});