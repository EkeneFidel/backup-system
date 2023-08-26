import request from "supertest";
import path from "path";
import { app, server } from "../../index";
import S3 from "../../config/s3.config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import Authentication from "../../utils/auth.util";
import UserRepo from "../../repository/user.repository";
import { User } from "../../model/user.model";

let key: string;
let token: string;
let fileId: number;
let file = path.join(
  __dirname.split("/routers")[0],
  "test-files",
  "test-file.txt"
);
let shouldPerformCleanup = false;

afterAll(async () => {
  if (shouldPerformCleanup) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    const s3 = new S3();
    const command = new DeleteObjectCommand(params);
    await s3.client.send(command);
  }
  await server.close();
});

describe("Test file upload route", () => {
  it("should upload file to s3 bucket", async () => {
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
      .post("/api/v1/files/upload")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", file);
    if (response.body.file) {
      key = response.body.file.name;
      fileId = response.body.file.id;
    }
    shouldPerformCleanup = response.statusCode === 201;
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("file");
  });

  it("should not allow an unauthorized user upload a file", async () => {
    const response = await request(app)
      .post("/api/v1/files/upload")
      .attach("file", file);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("No auth token");
  });
});

describe("Test file dwonload route", () => {
  it("should allow user download file from s3 bucket", async () => {
    const response = await request(app)
      .get(`/api/v1/files/download/${fileId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    const contentDispositionHeader = response.header["content-disposition"];
    expect(contentDispositionHeader).toBeDefined();
    expect(contentDispositionHeader).toEqual(`attachment; filename=${key}`);
  });
});

describe("Test get all files route", () => {
  it("should return list of all files to user", async () => {
    const response = await request(app)
      .get("/api/v1/files/")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.files.length).toBe(1);
  });
});
