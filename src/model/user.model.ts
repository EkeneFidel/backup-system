import {
  Column,
  Model,
  Table,
  DataType,
  IsEmail,
  IsIn,
  AllowNull,
} from "sequelize-typescript";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "users" as string;
  public static USER_FULLNAME = "fullname" as string;
  public static USER_ID = "id" as string;
  public static USER_EMAIL = "email" as string;
  public static USER_PASSWORD = "password" as string;
  public static USER_ROLE = "role" as UserRole;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(64),
    field: User.USER_FULLNAME,
  })
  fullname!: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    field: User.USER_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    field: User.USER_PASSWORD,
  })
  password!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    field: User.USER_ROLE,
    defaultValue: UserRole.USER,
  })
  role!: UserRole;
}
