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
const auth_service_1 = require("../services/auth.service");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({
                        success: false,
                        message: "Credentials incomplete",
                    });
                }
                const { user, token } = yield new auth_service_1.AuthService().login(email, password);
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
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, fullname, password, role } = req.body;
                if (!email || !fullname || !password) {
                    return res.status(400).json({
                        success: false,
                        message: "Credentials incomplete",
                    });
                }
                const { user } = yield new auth_service_1.AuthService().signup(email, password, fullname, role);
                return res.status(200).json({
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
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map