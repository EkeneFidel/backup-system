import multer from "multer";
import multerS3 from "multer-s3";
import { GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import S3 from "../config/s3.config";
import * as dotenv from "dotenv";

dotenv.config();

export default class Helpers {
  public static AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string;

  public static uploadToS3(): multer.Multer {
    const s3 = new S3();

    const upload = multer({
      storage: multerS3({
        s3: s3.client,
        bucket: Helpers.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          let [name, ext] = file.originalname.split(".");
          cb(null, `${name}_${Date.now().toString()}.${ext}`);
        },
      }),
    });
    return upload;
  }

  public static async downloadFromS3(key: string) {
    const s3 = new S3();
    const input = {
      Bucket: Helpers.AWS_BUCKET_NAME,
      Key: key,
    };
    const command = new GetObjectCommand(input);
    let res = await s3.client.send(command);
    return res;
  }

  public static async deleteFileFromS3(key: string) {
    const params = {
      Bucket: Helpers.AWS_BUCKET_NAME,
      Key: key,
    };
    const s3 = new S3();
    const command = new DeleteObjectCommand(params);
    await s3.client.send(command);
    return;
  }
}
