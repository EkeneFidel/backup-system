import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import ErrorHandler from "../utils/errorhandler.util";

dotenv.config();

class AuthMiddleware {
  private static secretKey: string =
    (process.env.JWT_SECRET_KEY as string) || "my-secret-key";

  static verifyToken(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      throw new ErrorHandler(400, "No auth token");
    }

    const [tokenType, token] = req.headers.authorization.split(" ");

    if (tokenType !== "Bearer") {
      throw new ErrorHandler(403, "Bearer Token required");
    }

    try {
      const decoded: string | object = jwt.verify(
        token,
        AuthMiddleware.secretKey
      );

      if (!decoded) {
        throw new ErrorHandler(401, "Invalid Token");
      }
      req.app.locals.user = decoded;
      next();
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }
}

export default AuthMiddleware;
