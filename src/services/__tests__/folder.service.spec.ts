import * as dotenv from "dotenv";
import FolderService from "../folder.service";
import AuthService from "../auth.service";
import { Folder } from "../../model/folder.model";
import { UserRole, User } from "../../model/user.model";
import Database from "../../config/database.config";
import S3 from "../../config/s3.config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const db = new Database();

beforeAll(async () => {
  await db.sequelize?.sync({ force: true });
});

afterAll(async () => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "test-folder/",
  };
  const s3 = new S3();
  const command = new DeleteObjectCommand(params);
  const data = await s3.client.send(command);
  await db.sequelize?.close();
});

describe("Create Folder", () => {
  it("should create a folder in the s3", async () => {
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

    await FolderService.save("test-folder", user.user.id);
    const folder = await Folder.findOne({ where: { name: "test-folder" } });
    expect(folder).not.toBeNull();
  });
});
