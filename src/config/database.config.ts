import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { User } from "../model/user.model";
import { File } from "../model/file.model";
import { Folder } from "../model/folder.model";

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      logging: false,
      models: [User, Folder, File],
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("database connection has been established successfully");
      })
      .catch((err) => {
        console.log("Unable to connect to the the database");
      });
  }
}

export default Database;
