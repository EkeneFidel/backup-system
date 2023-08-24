import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";

import { User } from "./user.model";
import { File } from "./file.model";

@Table({
  tableName: Folder.FOLDER_TABLE_NAME,
})
export class Folder extends Model {
  public static FOLDER_TABLE_NAME = "folders" as string;
  public static FOLDER_NAME = "name" as string;
  public static FOLDER_ID = "id" as string;
  public static FOLDER_ETAG = "eTag" as string;
  public static USER_ID = "userId" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Folder.FOLDER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(64),
    field: Folder.FOLDER_NAME,
  })
  name!: string;
  @Column({
    type: DataType.STRING(),
    field: Folder.FOLDER_ETAG,
  })
  eTag!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Folder.USER_ID,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => File)
  files!: File[];
}
