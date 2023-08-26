import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import ErrorHandler from "../utils/errorhandler.util";
import { User } from "../model/user.model";

dotenv.config();

interface Decoded {
  userId: number;
  email: string;
  fullname: string;
  iat?: number;
  exp?: number;
}

class AuthMiddleware {
  private static secretKey: string =
    (process.env.JWT_SECRET_KEY as string) || "my-secret-key";

  static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.headers.authorization) {
        throw new ErrorHandler(400, "No auth token");
      }

      const [tokenType, token] = req.headers.authorization.split(" ");

      if (tokenType !== "Bearer") {
        throw new ErrorHandler(403, "Bearer Token required");
      }

      const decoded: Decoded = jwt.verify(
        token,
        AuthMiddleware.secretKey
      ) as Decoded;

      if (!decoded) {
        throw new ErrorHandler(401, "Invalid Token");
      }

      let user = await User.findOne({
        where: {
          id: decoded.userId,
          email: decoded.email,
        },
      });
      if (!user) {
        throw new ErrorHandler(401, "Unathorized user");
      }
      req.app.locals.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async checkIsAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.app.locals.user;
      let user_data = await User.findOne({
        where: {
          id: user.userId,
          email: user.email,
        },
      });

      if (user_data?.role === "admin") {
        next();
      } else {
        throw new ErrorHandler(401, "User is not an admin");
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthMiddleware;
