import { sql } from "@vercel/postgres";
import { db } from "@/lib/kysely";

export async function seed() {
  // const createTable = await sql`
  //   CREATE TABLE IF NOT EXISTS users (
  //     id SERIAL PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     email VARCHAR(255) UNIQUE NOT NULL,
  //     image VARCHAR(255),
  //     "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;
  console.log(`Created "users" table`);
  const addUsers = await db
    .insertInto("users")
    .values([
      {
        name: "Alpha Olomi",
        email: "hello@alpjaolomi.com",
        image: "https://avatars.githubusercontent.com/u/10551599?v=4",
      },
      {
        name: "Bruno Alfredy",
        email: "support@jasirilabs.com",
        image:
          "https://avatars.githubusercontent.com/u/55545250?v=4",
      },

    ])
    .execute();
  console.log("Seeded database with 2 users");
  return {
    // createTable,
    addUsers,
  };
}
