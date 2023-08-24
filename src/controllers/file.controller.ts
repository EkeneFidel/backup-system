import { Request, Response, NextFunction } from "express";
import multer from "multer";
import FileService from "../services/file.services";
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
}

export default new FileController();
