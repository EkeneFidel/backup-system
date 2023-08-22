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
var Folder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const file_model_1 = require("./file.model");
let Folder = exports.Folder = Folder_1 = class Folder extends sequelize_typescript_1.Model {
};
Folder.FOLDER_TABLE_NAME = "files";
Folder.FOLDER_NAME = "name";
Folder.FOLDER_ID = "id";
Folder.USER_ID = "userId";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Folder_1.FOLDER_ID,
    }),
    __metadata("design:type", Number)
], Folder.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(64),
        field: Folder_1.FOLDER_NAME,
    }),
    __metadata("design:type", String)
], Folder.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: Folder_1.USER_ID,
    }),
    __metadata("design:type", Number)
], Folder.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Folder.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => file_model_1.File),
    __metadata("design:type", Array)
], Folder.prototype, "files", void 0);
exports.Folder = Folder = Folder_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Folder_1.FOLDER_TABLE_NAME,
    })
], Folder);
//# sourceMappingURL=folder.model.js.map