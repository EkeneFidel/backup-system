import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { File } from "../model/file.model";
import FileService from "../services/file.service";
import ErrorHandler from "../utils/errorhandler.util";

const upload = multer();

class FileController {
  async uploadFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      res.status(201).json({ success: true, file: new_file });
    } catch (error) {
      next(error);
    }
  }

  async getAllFiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let userId = req.app.locals.user.userId;
      let files = await FileService.getAllFiles(userId);
      res.status(201).json({ success: true, files: files });
    } catch (error) {
      next(error);
    }
  }

  async getFileById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let userId = req.app.locals.user.userId;
      let { id } = req.params;
      let { fileStream, name } = await FileService.downloadFile(userId, +id);
      res.set({
        "Content-Disposition": `attachment; filename=${name}`,
        "Content-Type": fileStream.ContentType || "application/octet-stream",
      });
      fileStream.Body.pipe(res);
      res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
