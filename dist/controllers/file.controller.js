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
const multer_1 = __importDefault(require("multer"));
const file_service_1 = __importDefault(require("../services/file.service"));
const errorhandler_util_1 = __importDefault(require("../utils/errorhandler.util"));
const upload = (0, multer_1.default)();
class FileController {
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file) {
                    throw new errorhandler_util_1.default(400, "No file provided");
                }
                if (file.size > 200 * 1024 * 1024) {
                    throw new errorhandler_util_1.default(413, "File size limit of 200MB exceeded");
                }
                let userId = req.app.locals.user.userId;
                const new_file = yield file_service_1.default.save(file, userId);
                return res.status(201).json({ success: true, file: new_file });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllFiles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.app.locals.user.userId;
                let files = yield file_service_1.default.getAllFiles(userId);
                return res.status(200).json({ success: true, files: files });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getFileById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.app.locals.user.userId;
                let { id } = req.params;
                let { fileStream, name } = yield file_service_1.default.downloadFile(userId, +id);
                res.set({
                    "Content-Disposition": `attachment; filename=${name}`,
                    "Content-Type": fileStream.ContentType || "application/octet-stream",
                });
                fileStream.Body.pipe(res);
                return res.status(200).json({ success: true });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new FileController();
//# sourceMappingURL=file.controller.js.map