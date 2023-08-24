import { S3Client } from "@aws-sdk/client-s3";

import * as dotenv from "dotenv";

dotenv.config();

class S3 {
  public client: S3Client | any;

  private AWS_REGION = process.env.AWS_REGION as string;
  private AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
  private AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;

  constructor() {
    this.connectToS3();
  }

  private async connectToS3() {
    this.client = new S3Client({
      region: this.AWS_REGION,
      credentials: {
        accessKeyId: this.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
}

export default S3;
