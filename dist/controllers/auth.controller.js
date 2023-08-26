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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const errorhandler_util_1 = __importDefault(require("../utils/errorhandler.util"));
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new errorhandler_util_1.default(400, "Credentials incomplete");
                }
                const { user, token } = yield auth_service_1.default.login(email, password);
                return res.status(200).json({
                    success: true,
                    message: "user login successfull",
                    user: {
                        email: user.email,
                        fullname: user.fullname,
                    },
                    token: token,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, fullname, password, role } = req.body;
                if (!email || !fullname || !password) {
                    throw new errorhandler_util_1.default(400, "Credentials incomplete");
                }
                if (role && !(role === user_model_1.UserRole.ADMIN || role === user_model_1.UserRole.ADMIN)) {
                    throw new errorhandler_util_1.default(400, "user role should be admin or user");
                }
                const { user } = yield auth_service_1.default.signup(email, password, fullname, role);
                return res.status(201).json({
                    success: true,
                    message: "user signup successfull",
                    user: {
                        email: user.email,
                        fullname: user.fullname,
                        role: user.role,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map