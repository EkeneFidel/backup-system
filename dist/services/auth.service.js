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
exports.AuthService = void 0;
const user_model_1 = require("../model/user.model");
const user_repository_1 = require("../repository/user.repository");
const auth_utils_1 = __importDefault(require("../utils/auth.utils"));
class AuthService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield new user_repository_1.UserRepo().findByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            // check password
            let compare = yield auth_utils_1.default.passwordCompare(password, user.password);
            if (compare) {
                return {
                    user: user,
                    token: auth_utils_1.default.generateToken(+user.id, user.email, user.fullname),
                };
            }
            else {
                throw new Error("Password incorrect");
            }
        });
    }
    signup(email, password, fullname, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield new user_repository_1.UserRepo().checkEmail(email);
            if (emailExists) {
                throw new Error("User with this email already exists");
            }
            const hashedPassword = yield auth_utils_1.default.passwordHash(password);
            const new_user = new user_model_1.User();
            new_user.fullname = fullname;
            new_user.email = email;
            new_user.password = hashedPassword;
            new_user.role = role || user_model_1.UserRole.USER;
            let final_user = yield new user_repository_1.UserRepo().save(new_user);
            return {
                user: final_user,
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map