import request from "supertest";
import { app, server } from "../../index";

afterAll(async () => {
  await server.close();
});

describe("Test signup route", () => {
  it("should signup a new user", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test-user@gmail.com",
      password: "password",
      fullname: "test user",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  it("should return an error if existing user tries to signup", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      email: "test-user@gmail.com",
      password: "password",
      fullname: "test user",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("User with this email already exists");
  });
});

describe("Test login route", () => {
  it("should login registered user", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test-user@gmail.com",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("should return error if user passes wrong credentials to login", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test-user@gmail.com",
      password: "passwor",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Password incorrect");
  });

  it("should return error if unregistered user tries to login", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "test-user1@gmail.com",
      password: "passwor",
    });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});
