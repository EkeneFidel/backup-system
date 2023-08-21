import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Credentials incomplete",
        });
      }
      const { user, token } = await new AuthService().login(email, password);
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
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { email, fullname, password, role } = req.body;
      if (!email || !fullname || !password) {
        return res.status(400).json({
          success: false,
          message: "Credentials incomplete",
        });
      }

      const { user } = await new AuthService().signup(
        email,
        password,
        fullname,
        role
      );

      return res.status(200).json({
        success: true,
        message: "user signup successfull",
        user: {
          email: user.email,
          fullname: user.fullname,
          role: user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
}

export default new AuthController();
