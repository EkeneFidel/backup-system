import { File } from "../model/file.model";
import ErrorHandler from "../utils/errorhandler.util";

interface FileInterface {
  save(file: File): Promise<File>;
  getById(fileId: File): Promise<File>;
  getAll(userId: number): Promise<File[]>;
}

class FileRepo implements FileInterface {
  async save(file: File): Promise<File> {
    try {
      let final_file = await File.create({
        name: file.name,
        url: file.url,
        userId: file.userId,
      });
      return final_file;
    } catch (error) {
      throw new ErrorHandler(500, "Internal server error");
    }
  }

  async getById(fileId: File): Promise<File> {
    try {
      const file = await File.findOne({
        where: {
          id: fileId,
        },
      });

      if (!file) {
        throw new ErrorHandler(404, "File not found");
      }

      return file;
    } catch (error) {
      throw new ErrorHandler(500, "Internal server error");
    }
  }

  async getAll(userId: number): Promise<File[]> {
    try {
      return await File.findAll({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw new ErrorHandler(500, "Internal server error");
    }
  }
}

export default new FileRepo();
