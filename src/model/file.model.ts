import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";

import { User } from "../model/user.model";
import { Admin } from "./admin.model";
import { Folder } from "./folder.model";
import { Reviews } from "./review.model";

@Table({
  tableName: File.FILE_TABLE_NAME,
})
export class File extends Model {
  public static FILE_TABLE_NAME = "files" as string;
  public static FILE_NAME = "name" as string;
  public static FILE_ID = "id" as string;
  public static FILE_URL = "url" as string;
  public static FILE_TYPE = "type" as string;
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

  @ForeignKey(() => Folder)
  @Column({
    type: DataType.INTEGER,
    field: File.FOLDER_ID,
  })
  folderId!: number;

  @BelongsTo(() => Folder)
  folder!: Folder;

  @Column({ defaultValue: 0 })
  reviewCount!: number;

  @HasMany(() => Reviews)
  reviews!: Reviews[];

  @BelongsToMany(() => Admin, () => Reviews)
  reviewAdmins!: Admin[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: File.USER_ID,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
