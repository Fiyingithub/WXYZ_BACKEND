// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../../generated/prisma/client.ts";
// import fs from "fs";
// import path from "path";

// const caPath = path.resolve(
//   process.cwd(),
//   "certs",
//   "ca.pem"
// );

// const pool = new Pool({

//   connectionString: process.env.DATABASE_URL,

//   ssl:
//     process.env.NODE_ENV === "production"
//       ? {
//           ca: fs.readFileSync(caPath, "utf8"),
//           rejectUnauthorized:true,
//         }
//       : undefined,

// });

// const adapter = new PrismaPg(pool);

// const prisma = new PrismaClient({
//  adapter,
// });

// export default prisma;
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.ts";
import fs from "fs";
import path from "path";
import ENV from "../config/env.config.ts";
import dotenv from "dotenv";

dotenv.config();


const sslConfig = ENV.database.ssl
  ? {
      ca: fs.readFileSync(path.resolve(ENV.database.caPath), "utf8"),
      rejectUnauthorized: true,
    }
  : undefined;


const connString = process.env.DATABASE_URL;


if (connString) {
    console.log(
        "DATABASE HOST FROM APP:",
        new URL(connString).hostname
    );
}


const pool = new Pool({
    connectionString: connString,
    ssl: sslConfig,
});


const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({
    adapter,
});


export default prisma;