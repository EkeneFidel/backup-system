import AuthController from "../controllers/auth.controller";
import BaseRouter from "./base.router";

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post("/login", AuthController.login);
    this.router.post("/signup", AuthController.signup);
  }
}

export default new AuthRouter().router;
