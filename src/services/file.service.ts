import { File } from "../model/file.model";
import FileRepo from "../repository/file.repository";
import ErrorHandler from "../utils/errorhandler.util";
import Helpers from "../helpers/file.helper";

interface FileInterface {
  save(file: Express.MulterS3.File, userId: number): Promise<File>;
  downloadFile(userId: number, fileId: number): any;
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
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async downloadFile(userId: number, fileId: number) {
    try {
      const file = await FileRepo.getById(userId, fileId);
      let fileStream = await Helpers.downloadFromS3(file.name);
      return { fileStream, name: file.name };
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getAllFiles(userId: number): Promise<File[]> {
    try {
      const files = await FileRepo.getAll(userId);
      return files;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }
}

export default new FileService();
