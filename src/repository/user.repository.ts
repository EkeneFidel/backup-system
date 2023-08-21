import { User } from "../model/user.model";

interface UserInterface {
  save(user: User): Promise<User>;
  getById(userId: User): Promise<User>;
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  checkEmail(email: string): Promise<Boolean>;
}

export class UserRepo implements UserInterface {
  async save(user: User): Promise<User> {
    try {
      let final_user = await User.create({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      return final_user;
    } catch (error) {
      throw new Error("Failed to create user");
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
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error("User not found");
    }
  }
  async getAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("No users found");
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
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("User not found");
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
      throw new Error("User not found");
    }
  }
}
