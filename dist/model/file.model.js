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
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../model/user.model");
const folder_model_1 = require("./folder.model");
let File = class File extends sequelize_typescript_1.Model {
};
exports.File = File;
File.FILE_TABLE_NAME = "files";
File.FILE_NAME = "name";
File.FILE_ID = "id";
File.FILE_URL = "url";
File.USER_ID = "userId";
File.FOLDER_ID = "folderId";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: File.FILE_ID,
    }),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        field: File.FILE_NAME,
    }),
    __metadata("design:type", String)
], File.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
        field: File.FILE_URL,
    }),
    __metadata("design:type", String)
], File.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => folder_model_1.Folder),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: File.FOLDER_ID,
    }),
    __metadata("design:type", Number)
], File.prototype, "folderId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => folder_model_1.Folder),
    __metadata("design:type", folder_model_1.Folder)
], File.prototype, "folder", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: File.USER_ID,
    }),
    __metadata("design:type", Number)
], File.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], File.prototype, "user", void 0);
exports.File = File = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: File.FILE_TABLE_NAME,
    })
], File);
//# sourceMappingURL=file.model.js.map