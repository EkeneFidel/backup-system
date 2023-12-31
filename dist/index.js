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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const dotenv = __importStar(require("dotenv"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const file_router_1 = __importDefault(require("./routers/file.router"));
const folder_router_1 = __importDefault(require("./routers/folder.router"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
dotenv.config();
const PORT = process.env.PORT;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.syncDatabase();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    syncDatabase() {
        var _a;
        const db = new database_config_1.default();
        (_a = db.sequelize) === null || _a === void 0 ? void 0 : _a.sync({ force: false });
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("welcome to the backup system");
        });
        this.app.use("/api/v1/auth", auth_router_1.default);
        this.app.use("/api/v1/files", auth_middleware_1.default.verifyToken, file_router_1.default);
        this.app.use("/api/v1/folders", auth_middleware_1.default.verifyToken, folder_router_1.default);
    }
}
const port = +PORT || 3000;
const app = new App().app;
exports.app = app;
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ success: false, message: err.message });
});
let server = app.listen(port, () => {
    console.log("Server started is running on port ", port);
});
exports.server = server;
//# sourceMappingURL=index.js.map