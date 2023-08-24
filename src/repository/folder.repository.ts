import { Folder } from "../model/folder.model";
import { User } from "../model/user.model";
import ErrorHandler from "../utils/errorhandler.util";

interface FolderInterface {
  save(folder: Folder): Promise<Folder>;
}

class FolderRepo implements FolderInterface {
  async save(folder: Folder): Promise<Folder> {
    try {
      let final_folder = await Folder.create({
        name: folder.name,
        eTag: folder.eTag,
        userId: folder.userId,
      });
      return final_folder;
    } catch (error) {
      throw new ErrorHandler(500, "Internal server error");
    }
  }
}

export default new FolderRepo();
