import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { File } from "../model/file.model";
import FileService from "../services/file.service";
import ErrorHandler from "../utils/errorhandler.util";

const upload = multer();

class FileController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file as Express.MulterS3.File;
      if (!file) {
        throw new ErrorHandler(400, "No file provided");
      }
      if (file.size > 200 * 1024 * 1024) {
        throw new ErrorHandler(413, "File size limit of 200MB exceeded");
      }
      let userId = req.app.locals.user.userId;
      const new_file = await FileService.save(file, userId);
      return res.status(201).json({ success: true, file: new_file });
    } catch (error) {
      next(error);
    }
  }

  async getAllFiles(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.app.locals.user.userId;
      let files = await FileService.getAllFiles(userId);
      return res.status(200).json({ success: true, files: files });
    } catch (error) {
      next(error);
    }
  }

  async getFileHistory(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;
      let files = await FileService.getAllUserFiles(+id);
      return res.status(200).json({ success: true, files: files });
    } catch (error) {
      next(error);
    }
  }

  async getAllFileHistory(req: Request, res: Response, next: NextFunction) {
    try {
      let files = await FileService.getAllFileHistory();
      return res.status(200).json({ success: true, files: files });
    } catch (error) {
      next(error);
    }
  }

  async getFileById(req: Request, res: Response, next: NextFunction) {
    try {
      let userId = req.app.locals.user.userId;
      let { id } = req.params;
      let { fileStream, name } = await FileService.downloadFile(userId, +id);
      res.set({
        "Content-Disposition": `attachment; filename=${name}`,
        "Content-Type": fileStream.ContentType || "application/octet-stream",
      });
      fileStream.Body.pipe(res);
      return res
        .status(200)
        .json({ success: true, message: "File downloaded" });
    } catch (error) {
      next(error);
    }
  }

  async markFileUnSafe(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;
      let userId = req.app.locals.user.userId;
      await FileService.makUnsafe(+id, userId);
      return res
        .status(200)
        .json({ success: true, message: "File marked unsafe" });
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
