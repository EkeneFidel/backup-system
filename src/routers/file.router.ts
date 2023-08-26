import FileController from "../controllers/file.controller";
import BaseRouter from "./base.router";
import Helpers from "../helpers/file.helper";
import AuthMiddleware from "../middlewares/auth.middleware";

class FileRouter extends BaseRouter {
  routes(): void {
    this.router.post(
      "/upload",
      Helpers.uploadToS3().single("file"),
      FileController.uploadFile
    );
    this.router.get("/", FileController.getAllFiles);
    this.router.patch(
      "/mark-unsafe/:id",
      AuthMiddleware.checkIsAdmin,
      FileController.markFileUnSafe
    );
    this.router.get("/download/:id", FileController.getFileById);
    this.router.get("/file-history/", FileController.getAllFileHistory);
    this.router.get("/file-history/:id", FileController.getFileHistory);
  }
}

export default new FileRouter().router;
