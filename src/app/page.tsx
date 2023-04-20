import { db } from "@/lib/db";

export default async function Home() {
  await db.set("hello", "hello");

  return <div className="m-4">hello world</div>;
}
