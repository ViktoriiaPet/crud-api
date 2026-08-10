import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { pool } from "../src/config/db.js";
import { loginTestUser } from "./helpers/auth.js";

let email = "";

describe("DELETE /users/me", () => {
  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      [email]
    );
  });

  it("should deactivate current user", async () => {
    const { token, email: userEmail } = await loginTestUser();

    email = userEmail;

    const deleteResponse = await request(app)
      .delete("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);

    const meResponse = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(meResponse.status).toBe(404);
  });
});