import FileController from "../controllers/file.controller";
import BaseRouter from "./base.router";
import Helpers from "../helpers/file.helper";

class FileRouter extends BaseRouter {
  routes(): void {
    this.router.post(
      "/upload",
      Helpers.uploadToS3().single("file"),
      FileController.uploadFile
    );
    this.router.get("/", FileController.getAllFiles);
    this.router.get("/download/:id", FileController.getFileById);
  }
}

export default new FileRouter().router;
