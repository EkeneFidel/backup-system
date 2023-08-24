import { PutObjectCommand } from "@aws-sdk/client-s3";

import S3 from "../config/s3.config";
import * as dotenv from "dotenv";

dotenv.config();

export default class Helpers {
  public static AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;

  public static async createFolder(name: string) {
    const s3 = new S3();
    const input = {
      Bucket: Helpers.AWS_BUCKET_NAME,
      Key: `${name}/`,
    };
    const command = new PutObjectCommand(input);
    let res = await s3.client.send(command);
    return res;
  }
}
