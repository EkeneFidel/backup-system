import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import FileService from "../file.service";
import { File } from "../../model/file.model";
import { UserRole, User } from "../../model/user.model";
import Database from "../../config/database.config";
import S3 from "../../config/s3.config";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const db = new Database();
let file = path.join(
  __dirname.split("/services")[0],
  "test-files",
  "test-file.txt"
);

const uploadFileToS3 = async () => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "test-file.txt",
    Body: fs.createReadStream(file),
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
beforeAll(async () => {
  await db.sequelize?.sync({ force: true });
});

afterAll(async () => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "test-file.txt",
  };
  const s3 = new S3();
  const command = new DeleteObjectCommand(params);
  await s3.client.send(command);
  await db.sequelize?.close();
});

describe("Save File", () => {
  it("should save file in the db", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "password",
      fullname: "test user",
      role: "user" as UserRole,
    };
    const user = await User.create(payload);
    const file = await uploadFileToS3();
    file.key = "test-file.txt";
    file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`;

    const savedFile = await FileService.save(file, user.id);
    const fileFound = await File.findAll({ where: { name: file.key } });
    expect(savedFile).not.toBeNull();
    expect(fileFound).not.toBeNull();
    expect(fileFound.length).toEqual(1);
    await File.destroy({ where: { name: file.key } });
  });
});

describe("Download File", () => {
  it("should download a file from the s3 bucket", async () => {
    const user = await User.findOne({
      where: {
        email: "test@gmail.com",
      },
    });
    const file = await File.findOne({
      where: {
        name: "test-file.txt",
      },
    });
    if (user && file) {
      const result = await FileService.downloadFile(user.id, file.id);
      expect(result).not.toBeNull();
    }
  });
});

describe("Get All Files", () => {
  it("should return a list of all the files", async () => {
    const file1 = {
      name: "file1.txt",
      url: "www.example-file1.com",
      userId: 1,
    };
    const file2 = {
      name: "file2.txt",
      url: "www.example-file2.com",
      userId: 1,
    };
    await File.bulkCreate([file1, file2]);
    const files = await FileService.getAllFiles(1);
    expect(files.length).toEqual(2);
  });
});
