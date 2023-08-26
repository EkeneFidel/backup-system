"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_model_1 = require("../model/file.model");
const user_model_1 = require("../model/user.model");
const errorhandler_util_1 = __importDefault(require("../utils/errorhandler.util"));
class FileRepo {
    save(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let final_file = yield file_model_1.File.create({
                    name: file.name,
                    url: file.url,
                    userId: file.userId,
                });
                return final_file;
            }
            catch (error) {
                throw new errorhandler_util_1.default(500, error.message);
            }
        });
    }
    getById(userId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield file_model_1.File.findOne({
                    where: {
                        id: fileId,
                        userId: userId,
                    },
                });
                if (!file) {
                    throw new errorhandler_util_1.default(404, "File not found");
                }
                return file;
            }
            catch (error) {
                throw new errorhandler_util_1.default(500, error.message);
            }
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield file_model_1.File.findAll({
                    where: {
                        userId: userId,
                    },
                    include: [
                        {
                            model: user_model_1.User,
                            attributes: ["fullname", "email"],
                        },
                    ],
                });
            }
            catch (error) {
                throw new errorhandler_util_1.default(500, error.message);
            }
        });
    }
}
exports.default = new FileRepo();
//# sourceMappingURL=file.repository.js.map