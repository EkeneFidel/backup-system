import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

interface Payload {
  userId: number;
  email: string;
  fullname: string;
}

class Authentication {
  public static passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async passwordCompare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(
    id: number,
    email: string,
    fullname: string
  ): string {
    const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret-key";
    const payload: Payload = { userId: id, email: email, fullname: fullname };
    const option = { expiresIn: process.env.JWT_EXPIRES_IN };

    return jwt.sign(payload, secretKey, option);
  }

  public static validateToken(token: string): Payload | null {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret-key";
      return jwt.verify(token, secretKey) as Payload;
    } catch (error) {
      return null;
    }
  }
}

export default Authentication;
