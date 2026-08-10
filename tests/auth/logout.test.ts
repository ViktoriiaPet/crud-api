import crypto from "crypto";
import request from "supertest";
import { describe, expect, it } from "vitest";
import {app} from "../../src/app.js";

describe("POST /auth/logout", () => {
  it("should logout user and invalidate refresh token", async () => {
    const email = `logout-${crypto.randomUUID()}@example.com`;
    const password = "password123";

    const registerResponse = await request(app)
      .post("/auth/register")
      .send({
        name: "Logout User",
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
    expect(loginResponse.body.refreshToken).toBeDefined();

    const refreshToken = loginResponse.body.refreshToken;


    const logoutResponse = await request(app)
      .post("/auth/logout")
      .send({
        refreshToken,
      });

    expect(logoutResponse.status).toBe(204);

    const refreshResponse = await request(app)
      .post("/auth/refresh")
      .send({
        refreshToken,
      });


    expect(refreshResponse.status).toBe(401);
    expect(refreshResponse.body.message).toBe("Invalid refresh token");
  });
});

