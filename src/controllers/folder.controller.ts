import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { Folder } from "../model/folder.model";
import FolderService from "../services/folder.service";
import ErrorHandler from "../utils/errorhandler.util";

const upload = multer();

class FolderController {
  async createFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let userId = req.app.locals.user.userId;
      let { folderName } = req.body;
      const new_folder = await FolderService.save(folderName, userId);
      res.status(201).json({ success: true, folder: new_folder });
    } catch (error) {
      next(error);
    }
  }
}

export default new FolderController();
