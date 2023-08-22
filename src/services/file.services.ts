import { User } from "../model/user.model";
import { File } from "../model/file.model";
import { FileRepo } from "../repository/file.repository";

interface FileInterface {
  save(name: string, url: string, userId: number, user: User): Promise<void>;
  download(): Promise<void>;
}

export class FileService implements FileInterface {
  async save(
    name: string,
    url: string,
    userId: number,
    user: User
  ): Promise<void> {
    try {
      const new_file = new File();
      new_file.name = name;
      new_file.url = url;
      new_file.userId = userId;
      new_file.user = user;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  async download(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
