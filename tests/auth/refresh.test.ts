
import crypto from "crypto";
import request from "supertest";
import { describe, expect, it } from "vitest";
import {app} from "../../src/app.js";
import { pool } from "../../src/config/db.js";

describe("POST /auth/refresh", () => {
  it("should rotate refresh token", async () => {
    const email = `refresh-${crypto.randomUUID()}@example.com`;
    const password = "password123";

    const registerResponse = await request(app)
      .post("/auth/register")
      .send({
        name: "Refresh User",
        email,
        password,
      });

    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({
        email,
        password,
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
    expect(loginResponse.body.refreshToken).toBeDefined();

    const oldRefreshToken = loginResponse.body.refreshToken;

    const refreshResponse = await request(app)
      .post("/auth/refresh")
      .send({
        refreshToken: oldRefreshToken,
      });

    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.body.token).toBeDefined();
    expect(refreshResponse.body.refreshToken).toBeDefined();

    const newRefreshToken = refreshResponse.body.refreshToken;

    expect(newRefreshToken).not.toBe(oldRefreshToken);

    const oldTokenInDb = await pool.query(
      `SELECT token
       FROM refresh_tokens
       WHERE token = $1`,
      [oldRefreshToken]
    );

    expect(oldTokenInDb.rows).toHaveLength(0);

    const newTokenInDb = await pool.query(
      `SELECT token
       FROM refresh_tokens
       WHERE token = $1`,
      [newRefreshToken]
    );

    expect(newTokenInDb.rows).toHaveLength(1);

    const oldTokenResponse = await request(app)
      .post("/auth/refresh")
      .send({
        refreshToken: oldRefreshToken,
      });

    expect(oldTokenResponse.status).toBe(401);
    expect(oldTokenResponse.body.message).toBe("Invalid refresh token");

    const newTokenResponse = await request(app)
      .post("/auth/refresh")
      .send({
        refreshToken: newRefreshToken,
      });

    expect(newTokenResponse.status).toBe(200);
    expect(newTokenResponse.body.token).toBeDefined();
    expect(newTokenResponse.body.refreshToken).toBeDefined();
  });
});

