import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { pool } from "../src/config/db.js";
import { loginTestUser } from "./helpers/auth.js"

let email = "";

describe("PUT /users/:id", () => {
  afterEach(async () => {
    await pool.query(
      "DELETE FROM users WHERE email = $1",
      [email]
    );
  });

  it("should update current user name", async () => {
    const { token, email: userEmail } = await loginTestUser();

    email = userEmail;

    const meResponse = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    const userId = meResponse.body.id;

    const response = await request(app)
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: userId,
      name: "Updated User",
      email: userEmail,
      role: "user",
    });

    expect(response.body).not.toHaveProperty("password");
  });
});