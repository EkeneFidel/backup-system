import request from "supertest";
import { app, server } from "../../index";
import Authentication from "../../utils/auth.util";
import UserRepo from "../../repository/user.repository";
import { User } from "../../model/user.model";
import Helpers from "../../helpers/file.helper";

let token: string;
let folderName: string = "test-folder/";
let shouldPerformCleanup = false;

afterEach(async () => {
  if (shouldPerformCleanup) {
    await Helpers.downloadFromS3(folderName);
  }
});

afterAll(async () => {
  await server.close();
});

describe("Test create folder route", () => {
  it("should create file in s3 bucket", async () => {
    let user = {
      email: "test@gmail.com",
      password: "password",
      fullname: "test user",
      role: "user",
    } as User;
    let password = await Authentication.passwordHash(user.password);
    user.password = password;
    let final_user = await UserRepo.save(user);
    token = await Authentication.generateToken(
      final_user.id,
      final_user.email,
      final_user.fullname
    );
    const response = await request(app)
      .post("/api/v1/folders/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        folderName: folderName,
      });
    shouldPerformCleanup = response.statusCode === 201;
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("folder");
  });

  it("should not allow an unauthorized user create a folder", async () => {
    const response = await request(app).post("/api/v1/folders/create").send({
      folderName: folderName,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("No auth token");
  });
});
