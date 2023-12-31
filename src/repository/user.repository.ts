import { Admin } from "../model/admin.model";
import { User } from "../model/user.model";
import ErrorHandler from "../utils/errorhandler.util";

interface UserInterface {
  save(user: User): Promise<User>;
  getById(userId: User): Promise<User>;
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  checkEmail(email: string): Promise<Boolean>;
}

class UserRepo implements UserInterface {
  async save(user: User): Promise<User> {
    try {
      let final_user = await User.create({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      if (user.role === "admin") {
        await Admin.create({
          userId: final_user.id,
        });
      }
      return final_user;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }

  async getById(userId: User): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new ErrorHandler(404, "User not found");
      }

      return user;
    } catch (error) {
      throw new ErrorHandler(404, "User not found");
    }
  }
  async getAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new ErrorHandler(404, "Users not found");
    }
  }
  async findByEmail(email: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new ErrorHandler(404, "User not found");
      }
      return user;
    } catch (error) {
      throw new ErrorHandler(404, "User not found");
    }
  }

  async checkEmail(email: string): Promise<Boolean> {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      throw new ErrorHandler(500, (error as Error).message);
    }
  }
}

export default new UserRepo();
