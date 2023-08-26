import Helpers from "../helpers/file.helper";
import { File } from "../model/file.model";
import { User } from "../model/user.model";
import ErrorHandler from "../utils/errorhandler.util";

interface FileInterface {
  save(file: File): Promise<File>;
  markUnsafe(id: number): Promise<void>;
  getById(userId: number, fileId: number): Promise<File>;
  getAll(userId: number): Promise<File[]>;
}

interface GroupedFiles {
  user: User;
  files: File[];
}

class FileRepo implements FileInterface {
  async save(file: File): Promise<File> {
    try {
      let final_file = await File.create({
        name: file.name,
        url: file.url,
        type: file.type,
        userId: file.userId,
      });
      return final_file;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async markUnsafe(fileId: number): Promise<void> {
    try {
      let file = await File.findByPk(fileId);
      if (file) {
        if (file.type === "video" || file.type === "image") {
          file.isSafe = false;
          Helpers.deleteFileFromS3(file.name);
          await file.destroy();
          return;
        } else {
          throw new ErrorHandler(
            405,
            "Only image or video files can be marked unsafe"
          );
        }
      }
      throw new ErrorHandler(404, "File not found");
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getById(userId: number, fileId: number): Promise<File> {
    try {
      let user = await User.findByPk(userId);
      let file;
      if (user?.role === "admin") {
        file = await File.findByPk(fileId, {
          include: [
            {
              model: User,
              attributes: ["id", "email"],
            },
          ],
        });
      } else {
        file = await File.findOne({
          where: {
            id: fileId,
            userId: userId,
          },
          include: [
            {
              model: User,
              attributes: ["id", "email"],
            },
          ],
        });
      }

      if (!file) {
        throw new ErrorHandler(404, "File not found");
      }

      return file;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getAll(userId: number): Promise<File[]> {
    try {
      let user = await User.findByPk(userId);
      if (user?.role === "admin") {
        return await File.findAll({
          include: [
            {
              model: User,
              attributes: ["id", "email"],
            },
          ],
        });
      }
      return await File.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getFileHistoryofAllUsers(): Promise<any> {
    try {
      const files = await File.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
        order: [["id", "ASC"]],
      });
      const groupedFiles: { [userId: number]: GroupedFiles } = {};

      files.forEach((file) => {
        const user = file.user!;

        if (!groupedFiles[user.id]) {
          groupedFiles[user.id] = {
            user: user,
            files: [],
          };
        }

        groupedFiles[user.id].files.push(file);
      });
      return Object.values(groupedFiles);
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }
}

export default new FileRepo();
