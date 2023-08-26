import * as dotenv from "dotenv";
import FolderService from "../folder.service";
import { Folder } from "../../model/folder.model";
import { UserRole, User } from "../../model/user.model";
import Database from "../../config/database.config";
import Helpers from "../../helpers/file.helper";

dotenv.config();

const db = new Database();

beforeAll(async () => {
  await db.sequelize?.sync({ force: true });
});

afterAll(async () => {
  await Helpers.deleteFileFromS3("test-folder/");
  await db.sequelize?.close();
});

describe("Create Folder", () => {
  it("should create a folder in the s3", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "password",
      fullname: "test user",
      role: "user" as UserRole,
    };
    const user = await User.create(payload);

    await FolderService.save("test-folder", user.id);
    const folder = await Folder.findOne({ where: { name: "test-folder" } });
    expect(folder).not.toBeNull();
  });
});
