"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const errorhandler_util_1 = __importDefault(require("../utils/errorhandler.util"));
const user_model_1 = require("../model/user.model");
dotenv.config();
class AuthMiddleware {
    static verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization) {
                    throw new errorhandler_util_1.default(400, "No auth token");
                }
                const [tokenType, token] = req.headers.authorization.split(" ");
                if (tokenType !== "Bearer") {
                    throw new errorhandler_util_1.default(403, "Bearer Token required");
                }
                const decoded = jsonwebtoken_1.default.verify(token, AuthMiddleware.secretKey);
                if (!decoded) {
                    throw new errorhandler_util_1.default(401, "Invalid Token");
                }
                let user = yield user_model_1.User.findOne({
                    where: {
                        id: decoded.userId,
                        email: decoded.email,
                    },
                });
                if (!user) {
                    throw new errorhandler_util_1.default(401, "Unathorized user");
                }
                req.app.locals.user = decoded;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
AuthMiddleware.secretKey = process.env.JWT_SECRET_KEY || "my-secret-key";
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map