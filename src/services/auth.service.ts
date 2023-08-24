import { User, UserRole } from "../model/user.model";
import UserRepo from "../repository/user.repository";
import Authentication from "../utils/auth.util";
import ErrorHandler from "../utils/errorhandler.util";

interface Login {
  user: User;
  token: String;
}

interface Signup {
  user: User;
}

interface AuthInterface {
  login(email: string, password: string): Promise<Login>;
  signup(
    email: string,
    password: string,
    fullname: string,
    role?: UserRole
  ): Promise<Signup>;
}

class AuthService implements AuthInterface {
  async login(email: string, password: string): Promise<Login> {
    const user = await UserRepo.findByEmail(email);

    if (!user) {
      throw new ErrorHandler(40, "User not found");
    }

    // check password
    let compare = await Authentication.passwordCompare(password, user.password);

    if (compare) {
      return {
        user: user,
        token: Authentication.generateToken(
          +user.id,
          user.email,
          user.fullname
        ),
      };
    } else {
      throw new ErrorHandler(401, "Password incorrect");
    }
  }

  async signup(
    email: string,
    password: string,
    fullname: string,
    role?: UserRole
  ): Promise<Signup> {
    const emailExists = await UserRepo.checkEmail(email);

    if (emailExists) {
      throw new ErrorHandler(400, "User with this email already exists");
    }
    const hashedPassword: string = await Authentication.passwordHash(password);
    const new_user = new User();
    new_user.fullname = fullname;
    new_user.email = email;
    new_user.password = hashedPassword;
    new_user.role = role || UserRole.USER;

    let final_user = await UserRepo.save(new_user);

    return {
      user: final_user,
    };
  }
}

export default new AuthService();
