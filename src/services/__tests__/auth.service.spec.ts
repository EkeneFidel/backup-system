import AuthService from "../auth.service";
import { UserRole, User } from "../../model/user.model";
import Database from "../../config/database.config";
import * as dotenv from "dotenv";

dotenv.config();

const db = new Database();
beforeAll(async () => {
  await db.sequelize?.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize?.close();
});

describe("signup service", () => {
  it("should signup and create a user", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "password",
      fullname: "test user",
    };
    const user = await AuthService.signup(
      payload.email,
      payload.password,
      payload.fullname
    );
    const userFound = await User.findAll({ where: { email: payload.email } });
    expect(user).not.toBeNull();
    expect(userFound.length).toEqual(1);
  });
  it("should throw an error if user is already registered", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "password",
      fullname: "test user",
      role: "user" as UserRole,
    };
    await expect(
      AuthService.signup(
        payload.email,
        payload.password,
        payload.fullname,
        payload.role
      )
    ).rejects.toThrow();
  });
});

describe("login service", () => {
  it("should login user and return a token", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "password",
    };
    const user = await AuthService.login(payload.email, payload.password);
    expect(user).toHaveProperty("user");
    expect(user).toHaveProperty("token");
  });
  it("should throw an error when password is incorrect", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "password1",
    };
    await expect(
      AuthService.login(payload.email, payload.password)
    ).rejects.toThrow();
  });
  it("should throw an error when the user tries to login with an unregistered email", async () => {
    const payload = {
      email: "test1@gmail.com",
      password: "password",
    };
    await expect(
      AuthService.login(payload.email, payload.password)
    ).rejects.toThrow();
  });
});
