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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const auth_util_1 = __importDefault(require("../utils/auth.util"));
const errorhandler_util_1 = __importDefault(require("../utils/errorhandler.util"));
class AuthService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(email);
            if (!user) {
                throw new errorhandler_util_1.default(401, "User not found");
            }
            // check password
            let compare = yield auth_util_1.default.passwordCompare(password, user.password);
            if (compare) {
                return {
                    user: user,
                    token: auth_util_1.default.generateToken(+user.id, user.email, user.fullname),
                };
            }
            else {
                throw new errorhandler_util_1.default(401, "Password incorrect");
            }
        });
    }
    signup(email, password, fullname, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield user_repository_1.default.checkEmail(email);
            if (emailExists) {
                throw new errorhandler_util_1.default(400, "User with this email already exists");
            }
            const hashedPassword = yield auth_util_1.default.passwordHash(password);
            const new_user = new user_model_1.User();
            new_user.fullname = fullname;
            new_user.email = email;
            new_user.password = hashedPassword;
            new_user.role = role || user_model_1.UserRole.USER;
            let final_user = yield user_repository_1.default.save(new_user);
            return {
                user: final_user,
            };
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map