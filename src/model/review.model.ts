import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

import { File } from "../model/file.model";
import { Admin } from "./admin.model";
import { User } from "./user.model";

@Table({
  tableName: Reviews.REVIEW_TABLE_NAME,
})
export class Reviews extends Model {
  public static REVIEW_TABLE_NAME = "review" as string;
  public static REVIEW_ID = "id" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Reviews.REVIEW_ID,
  })
  id!: number;

  @ForeignKey(() => File)
  @Column
  fileId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Admin)
  @Column
  adminId!: number;
}
