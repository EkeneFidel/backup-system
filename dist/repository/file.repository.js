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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepo = void 0;
const file_model_1 = require("../model/file.model");
class FileRepo {
    save(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let final_file = yield file_model_1.File.create({
                    fullname: file.name,
                    url: file.url,
                });
                return final_file;
            }
            catch (error) {
                throw new Error("Failed to create file");
            }
        });
    }
    getById(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield file_model_1.File.findOne({
                    where: {
                        id: fileId,
                    },
                });
                if (!file) {
                    throw new Error("File not found");
                }
                return file;
            }
            catch (error) {
                throw new Error("File not found");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield file_model_1.File.findAll();
            }
            catch (error) {
                throw new Error("No files found");
            }
        });
    }
}
exports.FileRepo = FileRepo;
//# sourceMappingURL=file.repository.js.map