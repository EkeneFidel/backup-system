"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const file_model_1 = require("../model/file.model");
const folder_model_1 = require("../model/folder.model");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = exports.User = User_1 = class User extends sequelize_typescript_1.Model {
};
User.USER_TABLE_NAME = "users";
User.USER_FULLNAME = "fullname";
User.USER_ID = "id";
User.USER_EMAIL = "email";
User.USER_PASSWORD = "password";
User.USER_ROLE = "role";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: User_1.USER_ID,
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        field: User_1.USER_FULLNAME,
    }),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_EMAIL,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: User_1.USER_PASSWORD,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(UserRole)),
        field: User_1.USER_ROLE,
        defaultValue: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => file_model_1.File),
    __metadata("design:type", Array)
], User.prototype, "files", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => folder_model_1.Folder),
    __metadata("design:type", Array)
], User.prototype, "folders", void 0);
exports.User = User = User_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: User_1.USER_TABLE_NAME,
    })
], User);
//# sourceMappingURL=user.model.js.map