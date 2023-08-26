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
const user_model_1 = require("../model/user.model");
const errorhandler_util_1 = __importDefault(require("../utils/errorhandler.util"));
class UserRepo {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let final_user = yield user_model_1.User.create({
                    fullname: user.fullname,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
                return final_user;
            }
            catch (error) {
                throw new errorhandler_util_1.default(500, error.message);
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({
                    where: {
                        id: userId,
                    },
                });
                if (!user) {
                    throw new errorhandler_util_1.default(404, "User not found");
                }
                return user;
            }
            catch (error) {
                throw new errorhandler_util_1.default(404, "User not found");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.User.findAll();
            }
            catch (error) {
                throw new errorhandler_util_1.default(404, "Users not found");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({
                    where: {
                        email: email,
                    },
                });
                if (!user) {
                    throw new errorhandler_util_1.default(404, "User not found");
                }
                return user;
            }
            catch (error) {
                throw new errorhandler_util_1.default(404, "User not found");
            }
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({
                    where: {
                        email: email,
                    },
                });
                if (user) {
                    return true;
                }
                return false;
            }
            catch (error) {
                throw new errorhandler_util_1.default(500, error.message);
            }
        });
    }
}
exports.default = new UserRepo();
//# sourceMappingURL=user.repository.js.map