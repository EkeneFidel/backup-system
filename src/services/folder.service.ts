import { Folder } from "../model/folder.model";
import FolderRepo from "../repository/folder.repository";
import ErrorHandler from "../utils/errorhandler.util";
import Helpers from "../helpers/folder.helper";

interface FolderInterface {
  save(name: string, userId: number): Promise<Folder>;
}

class FolderService implements FolderInterface {
  async save(name: string, userId: number): Promise<Folder> {
    try {
      const new_folder = new Folder();
      new_folder.name = name;
      new_folder.userId = userId;
      let res = await Helpers.createFolder(name);
      new_folder.eTag = res.ETag;
      let final_folder = await FolderRepo.save(new_folder);
      return final_folder;
    } catch (error) {
      throw new ErrorHandler(500, "Internal server error");
    }
  }
}

export default new FolderService();
