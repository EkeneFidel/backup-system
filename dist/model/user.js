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
var Users_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Users = exports.Users = Users_1 = class Users extends sequelize_typescript_1.Model {
};
Users.USER_TABLE_NAME = "users";
Users.USER_FULLNAME = "fullname";
Users.USER_ID = "id";
Users.USER_EMAIL = "email";
Users.USER_PASSWORD = "password";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Users_1.USER_ID,
    }),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Users_1.USER_FULLNAME,
    }),
    __metadata("design:type", String)
], Users.prototype, "fullname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Users_1.USER_EMAIL,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Users_1.USER_PASSWORD,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
exports.Users = Users = Users_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Users_1.USER_TABLE_NAME,
    })
], Users);
//# sourceMappingURL=user.js.map