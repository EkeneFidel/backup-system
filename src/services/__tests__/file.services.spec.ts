import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import FileService from "../file.service";
import AuthService from "../auth.service";
import { File } from "../../model/file.model";
import Authentication from "../../utils/auth.util";
import { UserRole, User } from "../../model/user.model";
import Database from "../../config/database.config";

dotenv.config();

const db = new Database();

// const uploadFileToS3 = async(key:string)=>{
//   const uploadParams = {
//     Bucket: bucket,
//     Key: fileKey,
//     Body: fs.createReadStream(filePath),
//   };
// }

beforeAll(async () => {
  await db.sequelize?.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize?.close();
});

describe("save", () => {
  it("should save file in db", async () => {
    console.log(path.dirname("src/test-files/test-fileService.txt"));
    const payload = {
      email: "admin@gmail.com",
      password: "password",
      fullname: "admin user",
      role: "admin" as UserRole,
    };
    const user = await AuthService.signup(
      payload.email,
      payload.password,
      payload.fullname,
      payload.role
    );
    const file = {
      key: "example.txt",
      location: "www.example-url.com",
    };

    const savedFile = await FileService.save(file, user.user.id);
    const fileFound = await File.findAll({ where: { name: file.key } });
    expect(savedFile).not.toBeNull();
    expect(fileFound.length).toEqual(1);
  });
});

// describe("downloadFile", () => {
//   it("should login user and return a token", async () => {
//     const payload = {
//       email: "admin@gmail.com",
//       password: "password",
//     };
//     const user = await AuthService.login(payload.email, payload.password);
//     expect(user).toHaveProperty("user");
//     expect(user).toHaveProperty("token");
//   });
//   it("should throw an error when password is incorrect", async () => {
//     const payload = {
//       email: "admin@gmail.com",
//       password: "password1",
//     };
//     await expect(
//       AuthService.login(payload.email, payload.password)
//     ).rejects.toThrow();
//   });
//   it("should throw an error when the user tries to login with an unregistered email", async () => {
//     const payload = {
//       email: "admin1@gmail.com",
//       password: "password",
//     };
//     await expect(
//       AuthService.login(payload.email, payload.password)
//     ).rejects.toThrow();
//   });
// });
