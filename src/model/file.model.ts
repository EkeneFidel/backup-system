import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";

import { User } from "../model/user.model";
import { Folder } from "./folder.model";

@Table({
  tableName: File.FILE_TABLE_NAME,
})
export class File extends Model {
  public static FILE_TABLE_NAME = "files" as string;
  public static FILE_NAME = "name" as string;
  public static FILE_ID = "id" as string;
  public static FILE_URL = "url" as string;
  public static FILE_TYPE = "type" as string;
  public static FILE_SAFE_STATUS = "isSafe" as string;
  public static USER_ID = "userId" as string;
  public static FOLDER_ID = "folderId" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: File.FILE_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(64),
    field: File.FILE_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(),
    field: File.FILE_URL,
  })
  url!: string;

  @Column({
    type: DataType.STRING(),
    field: File.FILE_TYPE,
  })
  type!: string;

  @Column({
    type: DataType.BOOLEAN(),
    field: File.FILE_SAFE_STATUS,
    defaultValue: true,
  })
  isSafe!: boolean;

  @ForeignKey(() => Folder)
  @Column({
    type: DataType.INTEGER,
    field: File.FOLDER_ID,
  })
  folderId!: number;

  @BelongsTo(() => Folder)
  folder!: Folder;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: File.USER_ID,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
