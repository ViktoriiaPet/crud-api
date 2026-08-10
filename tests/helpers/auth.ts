import crypto from "node:crypto";
import request from "supertest";
import { app } from "../../src/app.js";

export async function registerTestUser() {
  const password = "Password123!";
  const email = `test-${crypto.randomUUID()}@example.com`;

  const response = await request(app)
    .post("/auth/register")
    .send({
      name: "Test User",
      email,
      password,
    });

  return {
    response,
    email,
    password,
  };
}

export async function loginTestUser() {
  const { email, password } = await registerTestUser();

  const response = await request(app)
    .post("/auth/login")
    .send({
      email,
      password,
    });

  const token = response.body.token;

  return {
    response,
    email,
    token
  };
}