import { File } from "../model/file.model";
import FileRepo from "../repository/file.repository";
import ErrorHandler from "../utils/errorhandler.util";
import Helpers from "../helpers/file.helper";

interface FileInterface {
  save(file: Express.MulterS3.File, userId: number): Promise<File>;
  makUnsafe(fileId: number): Promise<void>;
  downloadFile(userId: number, fileId: number): any;
  getAllFiles(userId: number): Promise<File[]>;
}

class FileService implements FileInterface {
  async save(file: Express.MulterS3.File, userId: number): Promise<File> {
    try {
      const new_file = new File();
      new_file.name = file.key;
      new_file.url = file.location;
      new_file.type = file.mimetype.split("/")[0];
      new_file.userId = userId;

      let final_file = await FileRepo.save(new_file);
      return final_file;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async makUnsafe(fileId: number): Promise<void> {
    try {
      await FileRepo.markUnsafe(fileId);
      return;
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

  async getAllFileHistory(): Promise<File[]> {
    try {
      const files = await FileRepo.getFileHistoryofAllUsers();
      return files;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }
}

export default new FileService();
