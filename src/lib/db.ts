import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url) {
  console.log(url);

  throw new Error("UPSTASH_REDIS_REST_URL environment variable is not defined");
}

if (!token) {
  throw new Error(
    "UPSTASH_REDIS_REST_TOKEN environment variable is not defined"
  );
}

export const db = new Redis({
  url,
  token,
});
