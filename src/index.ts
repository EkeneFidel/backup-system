import express, { Application, Request, Response } from "express";
import Database from "./config/database";

import * as dotenv from "dotenv";
import AuthRouter from "./routers/auth.router";

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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected syncDatabase(): void {
    const db = new Database();
    db.sequelize?.sync({ force: false });
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome to the backup system");
    });
    this.app.use("/api/v1/auth", AuthRouter);
  }
}

const port: number = +PORT || 3000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started successfully!");
});
