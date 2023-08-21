import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.headers.authorization) {
    return res.status(401).send("No auth token");
  }

  let secretKey: string = process.env.JWT_SECRET_KEY || "my-secret-key";

  let [tokenType, token] = req.headers?.authorization?.split(" ")[1];

  if (tokenType !== "Bearer") {
    return res.status(403).json({
      succes: false,
      message: "Bearer Token required",
    });
  }

  try {
    const decoded: string | object = jwt.verify(token, secretKey);

    if (!decoded) {
      return res.status(401).json({
        succes: false,
        message: "Invalid Token",
      });
    }
    req.app.locals.user = decoded;
    return next();
  } catch (error) {
    res.send((error as Error).message);
  }
};
