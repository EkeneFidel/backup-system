import { File } from "../model/file.model";

interface FileInterface {
  save(file: File): Promise<File>;
  getById(fileId: File): Promise<File>;
  getAll(): Promise<File[]>;
  // findByEmail(email: string): Promise<File>;
  // checkEmail(email: string): Promise<Boolean>;
}

export class FileRepo implements FileInterface {
  async save(file: File): Promise<File> {
    try {
      let final_file = await File.create({
        fullname: file.name,
        url: file.url,
      });
      return final_file;
    } catch (error) {
      throw new Error("Failed to create file");
    }
  }

  async getById(fileId: File): Promise<File> {
    try {
      const file = await File.findOne({
        where: {
          id: fileId,
        },
      });

      if (!file) {
        throw new Error("File not found");
      }

      return file;
    } catch (error) {
      throw new Error("File not found");
    }
  }
  async getAll(): Promise<File[]> {
    try {
      return await File.findAll();
    } catch (error) {
      throw new Error("No files found");
    }
  }
}
