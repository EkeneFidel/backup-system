import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import Database from "./config/database.config";
import ErrorHandler from "./utils/errorhandler.util";

import * as dotenv from "dotenv";
import AuthRouter from "./routers/auth.router";
import FileRouter from "./routers/file.router";
import FolderRouter from "./routers/folder.router";
import AuthMiddleware from "./middlewares/auth.middleware";

dotenv.config();
const PORT = process.env.PORT as string;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.syncDatabase();
    this.middlewares();
    this.routes();
  }

  protected middlewares(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected syncDatabase(): void {
    const db = new Database();
    db.sequelize?.sync({ force: true });
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome to the backup system");
    });
    this.app.use("/api/v1/auth", AuthRouter);
    this.app.use("/api/v1/files", AuthMiddleware.verifyToken, FileRouter);
    this.app.use("/api/v1/folders", AuthMiddleware.verifyToken, FolderRouter);
  }
}

const port: number = +PORT || 3000;
const app = new App().app;

app.use(
  (
    err: ErrorHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ success: false, message: err.message });
  }
);

let server = app.listen(port, () => {
  console.log("Server started is running on port ", port);
});

export { app, server };
