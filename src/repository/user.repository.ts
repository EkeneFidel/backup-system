import { User } from "../model/user.model";

interface UserInterface {
  save(user: User): Promise<User>;
  getById(userId: User): Promise<User>;
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
}

export class UserRepo implements UserInterface {
  async save(user: User): Promise<User> {
    try {
      let final_user = await User.create({
        fullname: user.fullname,
        email: user.email,
        password: user.password,
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
      throw new Error("Method not implemented.");
    }
  }
  async getAll(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error("Method not implemented.");
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
      throw new Error("Method not implemented.");
    }
  }
}
