"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const base_router_1 = __importDefault(require("./base.router"));
class AuthRouter extends base_router_1.default {
    routes() {
        this.router.post("/login", auth_controller_1.default.login);
        this.router.post("/signup", auth_controller_1.default.signup);
    }
}
exports.default = new AuthRouter().router;
//# sourceMappingURL=auth.router.js.map