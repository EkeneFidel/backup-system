import { File } from "../model/file.model";
import FileRepo from "../repository/file.repository";
import ErrorHandler from "../utils/errorhandler.util";
import Helpers from "../helpers/file.helper";
import redisClient from "../config/redis.config";

interface FileInterface {
  save(file: Express.MulterS3.File, userId: number): Promise<File>;
  makUnsafe(fileId: number, userId: number): Promise<void>;
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
      await redisClient.del(`files:${userId}`);
      await redisClient.del(`file-history:${userId}`);
      await redisClient.del(`file-history:all`);
      return final_file;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async makUnsafe(fileId: number, userId: number): Promise<void> {
    try {
      let file = await File.findByPk(fileId);
      let ownerId = file?.userId;
      await redisClient.del(`files:${ownerId}`);
      await redisClient.del(`file-history:${ownerId}`);
      await redisClient.del(`file-history:all`);
      await FileRepo.markUnsafe(fileId, userId);
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
      const cachedFiles = await redisClient.get(`files:${userId}`);
      if (cachedFiles) {
        return JSON.parse(cachedFiles);
      }
      const files = await FileRepo.getAll(userId);
      await redisClient.set(`files:${userId}`, JSON.stringify(files), {
        EX: 1800,
        NX: true,
      });
      return files;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getAllUserFiles(userId: number): Promise<File[]> {
    try {
      const cachedFiles = await redisClient.get(`file-history:${userId}`);
      if (cachedFiles) {
        return JSON.parse(cachedFiles);
      }
      const files = await FileRepo.getAllForUser(userId);
      await redisClient.set(`file-history:${userId}`, JSON.stringify(files), {
        EX: 1800,
        NX: true,
      });
      return files;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getAllFileHistory(): Promise<File[]> {
    try {
      const cachedFileHistory = await redisClient.get(`file-history:all`);
      if (cachedFileHistory) {
        return JSON.parse(cachedFileHistory);
      }
      const files = await FileRepo.getFileHistoryofAllUsers();
      await redisClient.set(`file-history:all`, JSON.stringify(files), {
        EX: 1800,
        NX: true,
      });
      return files;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }
}

export default new FileService();
