require("dotenv").config();
import { createClient } from "redis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

const redisClient = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});
(async () => {
  await redisClient.connect();
})();
redisClient.on("connect", function () {
  console.log("Redis Connected!");
});

redisClient.on("error", (err) => {
  console.log("Error in the Redis Connection", err);
});

export default redisClient;
