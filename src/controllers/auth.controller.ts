import { NextFunction, Request, Response } from "express";
import { UserRole } from "../model/user.model";
import AuthService from "../services/auth.service";
import ErrorHandler from "../utils/errorhandler.util";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ErrorHandler(400, "Credentials incomplete");
      }
      const { user, token } = await AuthService.login(email, password);
      return res.status(200).json({
        success: true,
        message: "user login successfull",
        user: {
          email: user.email,
          fullname: user.fullname,
        },
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, fullname, password, role } = req.body;
      if (!email || !fullname || !password) {
        throw new ErrorHandler(400, "Credentials incomplete");
      }

      if (role && !(role === UserRole.ADMIN || role === UserRole.ADMIN)) {
        throw new ErrorHandler(400, "user role should be admin or user");
      }

      const { user } = await AuthService.signup(
        email,
        password,
        fullname,
        role
      );

      return res.status(201).json({
        success: true,
        message: "user signup successfull",
        user: {
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
