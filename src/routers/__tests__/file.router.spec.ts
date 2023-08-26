import request from "supertest";
import path from "path";
import fs from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { app, server } from "../../index";
import Authentication from "../../utils/auth.util";
import S3 from "../../config/s3.config";
import UserRepo from "../../repository/user.repository";
import { User } from "../../model/user.model";
import FileService from "../../services/file.service";
import Helpers from "../../helpers/file.helper";
import FileRepo from "../../repository/file.repository";

let key: string;
let token: string;
let savedUserId: number;
let fileId: number;
let savedFileId: number;
let file = path.join(
  __dirname.split("/routers")[0],
  "test-files",
  "test-file.txt"
);
let imageFile = path.join(
  __dirname.split("/routers")[0],
  "test-files",
  "test-image.png"
);
const uploadFileToS3 = async () => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "test-image.png",
    Body: fs.createReadStream(imageFile),
  };
  try {
    const s3 = new S3();
    const command = new PutObjectCommand(uploadParams);
    const data = await s3.client.send(command);
    return data;
  } catch (error) {
    throw new Error(`Error uploading file: ${error}`);
  }
};
let shouldPerformCleanup = false;

afterAll(async () => {
  if (shouldPerformCleanup) {
    await Helpers.deleteFileFromS3(key);
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

describe("Test file download route", () => {
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

describe("Test mark file unsafe route", () => {
  it("should not allow non admin user mark file unsafe", async () => {
    let user = {
      email: "test@gmail.com",
      password: "password",
      fullname: "test user",
      role: "user",
    } as User;

    let password = await Authentication.passwordHash(user.password);
    user.password = password;
    let finalUser = await UserRepo.save(user);
    savedUserId = finalUser.id;
    token = await Authentication.generateToken(
      finalUser.id,
      finalUser.email,
      finalUser.fullname
    );

    const file = await uploadFileToS3();
    file.key = "test-image.png";
    file.mimetype = "image/png";
    file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`;
    const savedFile = await FileService.save(file, finalUser.id);
    savedFileId = savedFile.id;

    const response = await request(app)
      .patch(`/api/v1/files/mark-unsafe/${savedFile.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("User is not an admin");
  });

  it("should allow admin user mark file unsafe", async () => {
    let user = {
      email: "admin@gmail.com",
      password: "password",
      fullname: "admin user",
      role: "admin",
    } as User;

    let password = await Authentication.passwordHash(user.password);
    user.password = password;
    let finalUser = await UserRepo.save(user);
    token = await Authentication.generateToken(
      finalUser.id,
      finalUser.email,
      finalUser.fullname
    );

    const response = await request(app)
      .patch(`/api/v1/files/mark-unsafe/${savedFileId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("File marked unsafe");
    await expect(FileRepo.getById(savedUserId, savedFileId)).rejects.toThrow();
  });
});
