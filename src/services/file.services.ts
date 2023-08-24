import { User } from "../model/user.model";
import { File } from "../model/file.model";
import FileRepo from "../repository/file.repository";
import ErrorHandler from "../utils/errorhandler.util";

interface FileInterface {
  save(file: Express.MulterS3.File, userId: number): Promise<File>;
  getAllFiles(userId: number): Promise<File[]>;
}

class FileService implements FileInterface {
  async save(file: Express.MulterS3.File, userId: number): Promise<File> {
    try {
      const new_file = new File();
      new_file.name = file.key;
      new_file.url = file.location;
      new_file.userId = userId;

      let final_file = await FileRepo.save(new_file);
      return final_file;
    } catch (error) {
      throw new ErrorHandler(500, "Unable to save file");
    }
  }
  async download(): Promise<void> {
    throw new ErrorHandler(500, "Unable to download file");
  }
  getAllFiles(userId: number): Promise<File[]> {
    try {
      const files = FileRepo.getAll(userId);
      return files;
    } catch (error) {}
    throw new ErrorHandler(500, "Unable to get files");
  }
}

export default new FileService();
