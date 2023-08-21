import { User } from "../model/user.model";
import { UserRepo } from "../repository/user.repository";
import Authentication from "../utils/auth.utils";

interface Login {
  user: User;
  token: String;
}

interface Signup {
  user: User;
}

interface AuthInterface {
  login(email: string, password: string): Promise<Login>;
  signup(email: string, password: string, fullname: string): Promise<Signup>;
}

export class AuthService implements AuthInterface {
  async login(email: string, password: string): Promise<Login> {
    const user = await new UserRepo().findByEmail(email);

    if (!user) {
      throw new Error("User not found");
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
      throw new Error("Password incorrect");
    }
  }
  async signup(
    email: string,
    password: string,
    fullname: string
  ): Promise<Signup> {
    const emailExists = await new UserRepo().findByEmail(email);

    if (emailExists) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword: string = await Authentication.passwordHash(password);
    const new_user = new User();
    new_user.fullname = fullname;
    new_user.email = email;
    new_user.password = hashedPassword;

    let final_user = await new UserRepo().save(new_user);

    return {
      user: final_user,
    };
  }
}
