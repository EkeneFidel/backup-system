import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { File } from "./file.model";
import { Reviews } from "./review.model";
import { User } from "./user.model";

@Table({
  tableName: Admin.ADMIN_TABLE_NAME,
})
export class Admin extends Model {
  public static ADMIN_TABLE_NAME = "admins" as string;
  public static ADMIN_ID = "id" as string;
  public static ADMIN_USER_ID = "userId" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Admin.ADMIN_ID,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Admin.ADMIN_USER_ID,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => File, () => Reviews)
  markedFiles!: File[];

  @HasMany(() => Reviews)
  fileReviews!: Reviews[];
}
