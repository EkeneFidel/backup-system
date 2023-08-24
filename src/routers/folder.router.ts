import FolderController from "../controllers/folder.controller";
import BaseRouter from "./base.router";
const request = require("supertest");

class FolderRouter extends BaseRouter {
  routes(): void {
    this.router.post("/create", FolderController.createFolder);
  }
}

export default new FolderRouter().router;
